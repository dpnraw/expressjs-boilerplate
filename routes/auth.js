const express = require('express')
const validateUserSignUpForm = require('../helpers/userSignUpFormValidators')
const {signin, signup } = require('../controllers/authController')

// for rotues level validation without helpers in signin method
const {check, validationResult, body} = require('express-validator');



const path = require('path')

const router = express.Router()

router.get('/signUp', signup)
// validate user is a middleware for form data validation
// sign is a controller function
router.post('/signUp', validateUserSignUpForm, signup)

router.get('/signIn', signin)
router.post('/signIn', 
    check('username').notEmpty().withMessage('Username field is required'),
    check('password').notEmpty().withMessage('Password field is required'), signin)


// router.get('/signUp', (req, res)=>{
//     res.send('Sign Up')
//     // res.render('signUp')
// })

// router.get('/signIn', (req, res)=>{
//     res.render('signIn')
// })


module.exports = router;