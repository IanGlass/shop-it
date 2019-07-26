const express = require('express');
const { check } = require('express-validator/check');

const authCont = require('../controllers/authCont');

const router = express.Router();

router.get('/login', authCont.getLogin);

router.post('/login', authCont.postLogin);

router.post('/logout', authCont.postLogout);

router.get('/signup', authCont.getSignup);

router.post('/signup', check('email').isEmail().withMessage('Please enter a valid email'), authCont.postSignup);

router.get('/reset', authCont.getReset);

router.post('/reset', authCont.postReset);

router.get('/new-password/:resetToken', authCont.getNewPassword);

router.post('/new-password', authCont.postNewPassword);

module.exports = router;