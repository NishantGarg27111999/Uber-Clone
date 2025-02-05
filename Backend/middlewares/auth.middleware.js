const jwt=require('jsonwebtoken');

const userModel=require('../models/user.model');
module.exports.authUser=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization.splid(' ')[1];

    if(!token){
        res.status(401).json({message: 'Unauthorized access'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        const user=await userModel.findById(decoded._id);
        req.user=user;
        return next();
    }
    catch(err){
        return res.status(401).json({message: 'Unauthorized access'});
    }


}