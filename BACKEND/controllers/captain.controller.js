const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            vehicleType: vehicle.vehicleType,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity
        });

        const token = captain.generateAuthToken();

        res.status(201).json({
            message: 'Captain registered successfully',
            captain: {
                id: captain._id,
                fullname: captain.fullname,
                email: captain.email,
                vehicle: captain.vehicle
            },
            token
        });
    }
    catch (error) {
        console.error('Error registering captain:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(404).json({ message: 'Invalid email or password (Captain not found)' });
        }

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({
            message: 'Captain logged in successfully',
            captain,
            token
        });
    } catch (error) {
        console.error('Error logging in captain:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getCaptainProfile = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.captain._id).select('-password');
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }
        res.status(200).json(captain);
    } catch (error) {
        console.error('Error fetching captain profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.logoutCaptain = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        res.clearCookie('token');
        await BlacklistTokenModel.create({ token });
        res.status(200).json({ message: 'Captain logged out successfully' });
    } catch (error) {
        console.error('Error logging out captain:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

