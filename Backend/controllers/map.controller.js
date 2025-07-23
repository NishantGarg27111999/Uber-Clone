const mapService=require('../services/map.service');
const {validationResult}=require('express-validator');

module.exports.getCoordinates=async(req,res,next)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {address}=req.query;
    

    try{
        const cooridnates=await mapService.getAddressCoordinate(address);
        res.status(200).json(cooridnates);
    }
    catch(error){
        res.status(404).json({message: 'Coordinates not found'});
    }
}

module.exports.getDistanceTime=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    try{
        const {origin,destination}=req.query;
        const distanceTime=await mapService.getDistanceTime(origin,destination);
        ret.status(200).json(distanceTime);
    }
    catch(err){
        // console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
}


module.exports.getAutoCompleteSuggestions=async(req,res,next)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            // console.log('errors');
            // console.log(errors);
            return res.status(400).json({errors: errors.array()});
        }
        const {input}=req.query;

        const suggestions=await mapService.getAutoCompleteSuggestions(input);
        return res.status(200).json(suggestions);
    }
    catch(err){
        // console.log("error> ");
        // console.log(err);
        
        return res.status(500).json({message: "Internal server error"});
    }
}