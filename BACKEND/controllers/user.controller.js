const USER = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res ,next) => {
    
    const errors  = validationResult(req);
    if (!errors .isEmpty()) {
        return res.status(400).json({ errors : errors .array() });
    }   

    const {fullname , email , password} = req.body;

    const existingUser = await USER.findOne({ email });
 
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await USER.hashPassword(password);

    const user = await userService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken(); 


    res.status(201).json({token , user});
}

module.exports.loginUser = async (req, res, next) => {
    console.log("Login API Hit ✅"); // 👈 Add this
    console.log("request coming in the backend part with data : " , req.body );
    const errors  = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors : errors .array() });
    }   

    const { email, password } = req.body;
    const user = await USER.findOne({email}).select('+password');
    if (!user) {
        return res.status(404).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(404).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token' , token );

    res.status(200).json({ token, user });
    
}

module.exports.getUserProfile = async (req, res) => {
  try {
    const user = await USER.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("🔥 Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  
    await BlacklistTokenModel.create({ token });
    res.status(200).json({ message: 'User logged out successfully' });
}