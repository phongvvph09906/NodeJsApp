const express = require('express');
const router = express.Router();

siteController = require('../app/controllers/SiteController');

router.get('/login', siteController.login);
router.get('/', siteController.index);

module.exports = router;