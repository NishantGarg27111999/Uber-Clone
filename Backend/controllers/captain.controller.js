const {validationResult}=require('express-validator');
const captainService=require('../services/captain.service')
const captianModel=require('../models/captain.model')

module.exports.registerCaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors});
    }

    const {fullname,email,password,vehicle}=req.body;
    const hashedPassword=  await captianModel.hashPassword(password);
    const captain=await captainService.createCaptain(
        {
            
                firstname:fullname.firstname,
                lastname:fullname.lastname,
            
            email,
            password:hashedPassword,
            
            color:vehicle.color,
            plate:vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    )

    const token=captain.generateAuthToken();

    res.status(201).json({captain,token});

}