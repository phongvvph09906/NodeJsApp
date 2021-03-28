const User = require('../models/User');
const { multipleMongooseToObject } = require('../../until/mongoose');

class SiteController {

    // GET /login
    login(req, res, next) {
        res.render('login', { layout: false });
    }

    // [GET] /
    index(req, res, next) {
        res.render('home', { layout: false });
    }
}

module.exports = new SiteController;
