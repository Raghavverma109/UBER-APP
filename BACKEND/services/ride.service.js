const rideModel = require('../models/ride.model');
const mapService = require('./map.service');
const crypto = require('crypto');



function getOTP(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10 , num-1), Math.pow(10 , num )).toString();
        return otp;
    }
    return generateOtp(num);
}

// Fuction to calculate the fare price 
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and Dstination is required !");
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const distance = parseFloat(distanceTime.distanceInKm);
    const duration = parseFloat(distanceTime.durationInMin);

    

    // calculate fare for auto , car  and bike 
    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    }

    console.log(distanceTime);

    const fare = {
    auto: Math.round(baseFare.auto + (distance * perKmRate.auto) + (duration * perMinuteRate.auto)),
    car: Math.round(baseFare.car + (distance * perKmRate.car) + (duration * perMinuteRate.car)),
    motorcycle: Math.round(baseFare.motorcycle + (distance * perKmRate.motorcycle) + (duration * perMinuteRate.motorcycle)),
};
    return fare;
}
module.exports.getFare = getFare;

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    console.log("user is : ", user);
    console.log("other details are : ", pickup, "destination is : ", destination, "vehicle type is  : ", vehicleType);
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are rquired');
    }
    const fare = await getFare(pickup, destination);

    


    console.log("fare is :", fare);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp : getOTP(6)
    }) 
    return ride

}
