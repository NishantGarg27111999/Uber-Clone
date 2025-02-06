const captianModle=require('../models/captain.model');

module.exports.createCaptain=async ({firstname,lastname,email,password,color,plate,capacity,vehicleType})=>{
    const user=await captianModle.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
       
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return user;
}