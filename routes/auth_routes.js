const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const authRegisterController = require('../controller/auth/register')
const authLoginController = require('../controller/auth/login')
router.post('/signup',body('password').isLength({min:8,max:50}).withMessage('type valid password'),body('username').isString().isLength({min:6,max:30}).withMessage('type valid user name'),body('phoneNumber').isNumeric().isLength({min:10,max:10}).withMessage('type valid phone number'),body("email").isEmail().isLength({min:8,max:200}).withMessage("type valid email"),authRegisterController.register)
router.post('/login',body("email").isEmail().isLength({min:8,max:200}).withMessage("type valid email"),body('password').isLength({min:8,max:50}).withMessage('type valid password'),authLoginController.login)
module.exports = router