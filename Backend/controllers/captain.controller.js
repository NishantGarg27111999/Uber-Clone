const {validationResult}=require('express-validator');
const captainService=require('../services/captain.service')
const captainModel=require('../models/captain.model');
const blackListTokenModel = require('../models/blackListToken.model');


module.exports.registerCaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors});
    }

    const {fullname,email,password,vehicle}=req.body;
    const hashedPassword=  await captainModel.hashPassword(password);
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

module.exports.loginCaptain=async(req,res,next)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors});
    }

    const {email,password}=req.body;

    const captain=await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const isPasswordMatch=captain.comparePassword(password);
    if(!isPasswordMatch){
        return res.status(401).json({message:'Invalid email or password'})
    }

    const token=captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({captain,token});
}

module.exports.getCaptainProfile=async(req,res,next)=>{
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain=async(req,res,next)=>{
    const token=req.cookies.token;
    res.clearCookie('token');
    await blackListTokenModel.create({token});
    res.status(200).json({message: 'Logged out'});

}