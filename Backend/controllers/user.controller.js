const userModel=require("../models/user.model")
const userService=require('../services/user.service');
 const {validationResult}= require("express-validator")


module.exports.registerUser=async(req,res,next)=>{
    
    console.log("hello");
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    console.log("sencond");
    const {fullname,email,password}=req.body;
    const hashedPassword=await userModel.hashPassword(password);
    console.log('third');
    const createdUser=await userService.createUser({firstname:fullname.firstname,lastname:fullname.lastname,email,password:hashedPassword});
    console.log('fourth');
    const token=createdUser.generateAuthToken();
    res.status(201).json({token,createdUser});
}

module.exports.loginUser=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;

    const user=await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json('Invalid email or password');
    }

    const isMatch= await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json('Invalid email or password');
    }

    const token=user.generateAuthToken();
    res.cookie('token',token);
    return res.status(201).json({user,token});
}

module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json(req.user);
}

