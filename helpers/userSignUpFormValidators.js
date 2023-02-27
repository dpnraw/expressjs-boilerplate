
const {check, validationResult, body} = require('express-validator');

const validateUserSignUpForm = [
    check('username')
    .isLength({min:5})
    .withMessage('Minimum 5 characters required!'),
    
    check('password')
        .isLength({min:5})
        .withMessage('Minimum 5 characters required!'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

module.exports = validateUserSignUpForm
