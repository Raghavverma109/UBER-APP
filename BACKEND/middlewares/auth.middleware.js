const USER = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await USER.findOne({"token" : token });

    if(isBlacklisted) {
        return res.status(401).json({ message: 'Authentication token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await USER.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
};