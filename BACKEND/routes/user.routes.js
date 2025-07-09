const express = require('express');
const router = express.Router();

const {body} = require('express-validator');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const User = require('../models/user.model');


    
router.post('/register', [
    
  //   (req, res, next) => {
  //   console.log("Registering user...");
  //   next();
  // },
    
    // these are validation checks for the user registration by using express-validator , this will ensure that the user inputs are valid before proceeding with the registration process
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long')
], 

// any errors that occur during the validation will be handled by the UserController.registerUser function

UserController.registerUser
)

router.post('/login', [
    
  //   (req, res, next) => {
  //   console.log("Logging in user...");
  //   next();
  // },
    
    // these are validation checks for the user login by using express-validator , this will ensure that the user inputs are valid before proceeding with the login process
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],    

UserController.loginUser
);

router.get('/profile', authMiddleware.authUser,UserController.getUserProfile );

router.get('/logout', authMiddleware.authUser, UserController.logoutUser);
module.exports = router;