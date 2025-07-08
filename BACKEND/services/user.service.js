const USER = require('../models/user.model');


module.exports.createUser = async ({
    firstname, lastname , email , password 
}) =>
    {
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }

    const user = USER({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    await user.save();

    return user;
}


