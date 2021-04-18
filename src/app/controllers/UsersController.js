const User = require('../models/User');
const { mongooseToObject, multipleMongooseToObject } = require('../../until/mongoose');

const { validationResult } = require('express-validator');

class UsersController {

    // [GET] /users/login
    login(req, res, next) {
        res.render('users/login');
    }

    // [POST] /users/login
    authenticate(req, res, next) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            res.redirect('/users')
        } else {
            return res.render('users/login', {
                errors: errors.array()
            });
        }
    }
    // [GET] /users/register
    register(req, res, next) {
        res.render('users/register');
    }

    // [GET] /users/create
    create(req, res, next) {
        res.render('users/create', {
            isAuthenticated: true
        });
    }

    // [GET] /users/:id/edit
    edit(req, res, next) {
        User.findById(req.params.id)
            .then((user) =>
                res.render('users/edit', {
                    user: mongooseToObject(user),
                    isAuthenticated: true
                }),
            )
            .catch(next);
    }

    // [PUT] /users/:id
    update(req, res, next) {
        const files = req.files;
        var paths = [];
        if (files) {
            for (var i = 0; i < files.length; i++) {
                var path = files[i].path.split("\\").slice(2).join("\\")
                paths.push(path)
            }
        }
        console.log(paths);
        User.updateOne({ _id: req.params.id }, 
            {   name: req.body.name,
                image: paths,
                birthday: req.body.birthday,
                email: req.body.email,
                gender: req.body.gender,
                hobby: req.body.hobby,
                description: req.body.description})
            .then(() => res.redirect('/users'))
            .catch(next);
    }

    // [DELETE] /users/:id
    delete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /users/store
    async store(req, res, next) {
        // Khởi tạo biến files để lưu thông tin của array 
        const files = req.file;
        var paths = [];
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            // if (files) {
            //     for (var i = 0; i < files.length; i++) {
            //         var path = files[i].path.split("\\").slice(2).join("\\")
            //         paths.push(path)
            //     }
            // }
            
            var imagePath = req.file.path.split("\\").slice(2).join("\\")
            console.log(imagePath);
            const user = await new User({
                name: req.body.name,
                image: imagePath,
                birthday: req.body.birthday,
                email: req.body.email,
                gender: req.body.gender,
                hobby: req.body.hobby,
                description: req.body.description,
            });
            
            user.save()
                .then(() => res.redirect('/users'))
                .catch(next);
        } else {
            return res.render('users/register', {
                errors: errors.array()
            });
        }

    }

    // [GET] /users/:slug
    show(req, res, next) {
        User.find({})
            .then(users => {
                res
                // .json(users);
                .render('users/show', {
                    isAuthenticated: true,
                    users: multipleMongooseToObject(users) 
                })
            })
            .catch(next);
    }

}

module.exports = new UsersController;
