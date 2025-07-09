const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password, vehicleType, color, plate, capacity
}) => {
    // ✅ Proper validation for flat fields
    if (
        !firstname || !email || !password ||
        !vehicleType || !color || !plate || !capacity
    ) {
        throw new Error('All fields are required');
    }

    // ✅ Create with nested structure expected by schema
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            vehicleType,
            color,
            plate,
            capacity
        }
    });

    return captain;
};
