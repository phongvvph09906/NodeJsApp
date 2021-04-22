const User = require('../models/User');
const { mongooseToObject, multipleMongooseToObject } = require('../../until/mongoose');
const fs = require('fs');
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
            .then((user) => {
                var type = '';
                try {
                    type = req.query.type;
                } catch (e) {
                }
                if (type == 'json') {
                    res.json(user)
                } else {
                    res.render('users/edit', {
                        user: mongooseToObject(user),
                        isAuthenticated: true
                    })
                }
            }
            )
            .catch(next);
    }

    // [PUT] /users/:id
    async update(req, res, next) {
        var data = req.body.data;
        if (data != null) {
            await User.updateOne({ _id: data.id },
                {
                    name: data.name,
                    birthday: data.birthday,
                    email: data.email,
                    gender: data.gender,
                    hobby: data.hobby,
                    description: data.description
                });
        } else {
            if (req.file == null) {
                User.updateOne({ _id: req.params.id },
                    {
                        name: req.body.name,
                        birthday: req.body.birthday,
                        email: req.body.email,
                        gender: req.body.gender,
                        hobby: req.body.hobby,
                        description: req.body.description
                    })
                    .then(() => res.redirect('/users'))
                    .catch(next);
            } else {
                var filePath = req.file.path.split('\\').slice(2).join('\\')
                User.updateOne({ _id: req.params.id },
                    {
                        name: req.body.name,
                        image: filePath,
                        birthday: req.body.birthday,
                        email: req.body.email,
                        gender: req.body.gender,
                        hobby: req.body.hobby,
                        description: req.body.description
                    })
                    .then(() => res.redirect('/users'))
                    .catch(next);
            }
        }
        

    }

    // [DELETE] /users/:id
    delete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /users/store
    async store(req, res, next) {
        var data = req.body.data;
        if (data != null) {
            const user = await new User({
                name: data.name,
                birthday: data.birthday,
                birthday: data.gender,
                hobby: data.hobby,
                description: data.description,
            });
            console.log(user);
            user.save(function (err) {
                if (err) return handleError(err);
            });
        } else {
            if (req.file == null) {
                const errors = validationResult(req);
                if (errors.isEmpty()) {
                    const user = await new User({
                        name: req.body.name,
                        birthday: req.body.birthday,
                        password: req.body.password,
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
            } else {
                const errors = validationResult(req);
                if (errors.isEmpty()) {
                    var filePath = req.file.path.split('\\').slice(2).join('\\')
                    const user = await new User({
                        name: req.body.name,
                        image: filePath,
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
        }
        

    }

    // [GET] /users/:slug
    show(req, res, next) {
        User.find({})
            .then(users => {
                var type = '';
                try {
                    type = req.query.type;
                } catch (e) {
                }
                if (type == 'json') {
                    res.json(users)
                } else {
                    res.render('users/show', {
                        isAuthenticated: true,
                        users: multipleMongooseToObject(users)
                    })
                }

            })
            .catch(next);
    }

}

module.exports = new UsersController;
