const User = require('../models/User');
const { mongooseToObject, multipleMongooseToObject } = require('../../until/mongoose');

class UsersController {

    // [GET] /users/create
    create(req, res, next) {
        res.render('users/create');
    }

    // [GET] /users/:id/edit
    edit(req, res, next) {
        User.findById( req.params.id )
            .then((user) =>
                res.render('users/edit', {
                    user: mongooseToObject(user),
                }),
            )
            .catch(next);
    }

    // [PUT] /users/:id
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
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
    store(req, res, next) {
        const user = new User(req.body);
        user.save()
            .then(() => res.redirect('/users'))
            .catch(error => {
                
            });
    }

    // [GET] /users/:slug
    show(req, res, next) {
        User.find({})
            .then(users => {
                res.render('users/show', {
                    users: multipleMongooseToObject(users) })
            })
            .catch(next);
    }

}

module.exports = new UsersController;
