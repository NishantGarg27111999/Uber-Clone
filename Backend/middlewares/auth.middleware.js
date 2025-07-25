const jwt=require('jsonwebtoken');
const blackListTokenModel=require('../models/blackListToken.model');
const userModel=require('../models/user.model');
const captianModel=require('../models/captain.model')


module.exports.authUser=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        
        return res.status(401).json({message: 'Unauthorized access'});
    }

    const blackListed=await blackListTokenModel.findOne({token});
  
    if(blackListed){
        
        return res.status(401).json({message: 'Unauthorized access'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded._id);
        const user=await userModel.findById(decoded._id);
        console.log("auth: ",user);
        if(!user){
            return res.status(401).json({message: 'Unauthorized access'});
        }
        req.user=user;
        return next();
    }
    catch(err){
        
        return res.status(401).json({message: 'Unauthorized access'});
    }


}

module.exports.authCaptain=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Unauthorized access'});
    }

    const blackListed=await blackListTokenModel.findOne({token});
    
    if(blackListed){
        
        return res.status(401).json({message: 'Unauthorized access'});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captianModel.findById(decoded._id);
        req.captain=captain;
        return next();
    }
    catch(err){
        
        return res.status(401).json({message: 'Unauthorized access'});
    }

}