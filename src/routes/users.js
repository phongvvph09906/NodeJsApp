const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { body, check } = require('express-validator');

const usersController = require('../app/controllers/UsersController');
const User = require('../app/models/User');

router.get('/login', usersController.login);
router.post('/login', [
    check('email').custom((value) => {
        var query = User.find({ email: value })
        return query.exec().then(user => {
            if (user.length <= 0) {
                return Promise.reject('Email không tồn tại!');
            }
        });
    }),
    check('password').custom((value) => {
        var query = User.find({ password: value })
        return query.exec().then(user => {
            if (user.length <= 0) {
                return Promise.reject('Mật khẩu không chính xác!');
            }
        });
    }),
], usersController.authenticate);
router.get('/register', usersController.register);
router.post('/register', [
    check('email').custom((value) => {
        var query = User.find({ email: value })
        return query.exec().then(user => {
            if (user.length > 0) {
                return Promise.reject('Email đã được sử dụng!');
            }
        });
    }),
    check('password', 'Mật khẩu phải lớn hơn 5 kí tự!')
        .isLength({ min: 5 })
        .matches(/\d/)
        .withMessage('Phải chứa một số'),
    body('confPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Mật khẩu nhập lại không chính xác!');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    })
], usersController.store);
router.get('/create', usersController.create);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/img/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
// Tối đa 5 file, mỗi file 2MB
var maxFiles = 3;
var maxSize = 2 * 1024 * 1024;
var upload = multer({
    storage,
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
    //         req.fileValidationError = 'Only .jpg are allowed';
    //         return cb(null, false, new Error('Only .jpg are allowed'));
    //     }
    //     cb(null, true);
    // },
    limits: {
        // fileSize: maxSize,
        files: maxFiles,
    }
}).single('avatar')

router.post('/store', function (req, res, next) {
    upload(req, res, function (err) {
        if (req.fileValidationError) {
            res.json({error: req.fileValidationError});
        }
        if (err instanceof multer.MulterError) {
            res.json(err.message);
        } else if (err) {
            // An unknown error occurred when uploading.
            res.json(err.message);
        }
        // Everything went fine.
        next();
    })
}, usersController.store);

router.get('/:id/edit', usersController.edit);
router.put('/:id', function (req, res, next) {
    upload(req, res, function (err) {
        if (req.fileValidationError) {
            res.json({error: req.fileValidationError});
        }
        if (err instanceof multer.MulterError) {
            res.json(err.message);
        } else if (err) {
            // An unknown error occurred when uploading.
            res.json(err.message);
        }
        // Everything went fine.
        next();
    })
}, usersController.update);
router.delete('/:id', usersController.delete);
router.get('/', usersController.show);

module.exports = router;