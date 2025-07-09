const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');


module.exports.registerCaptain = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname , email, password, vehicle } = req.body;

    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    try {
        const captain = await captainService.createCaptain({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password: hashedPassword,
            vehicleType : vehicle.vehicleType,
            color : vehicle.color,
            plate : vehicle.plate,
            capacity : vehicle.capacity
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
