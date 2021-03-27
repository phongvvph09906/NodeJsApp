const User = require('../models/User');
const { multipleMongooseToObject } = require('../../until/mongoose');

class SiteController {

    // GET /login
    login(req, res, next) {
        res.render('login', { layout: false });
    }

    // [GET] /
    index(req, res, next) {
        User.find({})
            .then(users => {
                res.render('home', {
                    layout: false,
                    users: multipleMongooseToObject(users) })
            })
            .catch(next);
    }
}

module.exports = new SiteController;
