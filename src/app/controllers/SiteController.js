const User = require('../models/User');
const { multipleMongooseToObject } = require('../../until/mongoose');

class SiteController {

    // [GET] /
    index(req, res, next) {
        res.render('home', { layout: false });
    }
}

module.exports = new SiteController;
