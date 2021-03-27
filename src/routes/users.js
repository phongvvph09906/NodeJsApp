const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');

router.get('/create', usersController.create);
router.post('/store', usersController.store);
router.get('/:id/edit', usersController.edit);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);
router.get('/', usersController.show);

module.exports = router;