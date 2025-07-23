const { validationResult } = require("express-validator");
const rideService=require('../services/ride.service');
const mapService=require('../services/map.service');
const {sendMessageToSocketId}=require('../socket');
const rideModel = require("../models/ride.model");
const {getIo}=require('../socket');
// conso   le.log(io);
const io=getIo();

module.exports.createRide=async(req,res)=>{
    // console.log("io ",io);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {pickup,destination,vehicleType}=req.body;
    try{
        const ride=await rideService.createRide({user: req.user._id,pickup,destination,vehicleType});
        res.status(201).json(ride);

        const pickupCoordinates=await mapService.getAddressCoordinate(pickup);
        console.log(pickupCoordinates);

        const captains= await mapService.getCaptiansInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,500);
        ride.otp="";
        const rideFinal=await rideModel.findById(ride._id).populate('user').select('+otp');
        console.log(rideFinal);
        console.log(captains);

        for(const c of captains){
            console.log("new-ride send message test");
            console.log(c.socketId);
            io.sockets.sockets.get(c.socketId)?.join(`ride_${rideFinal._id}`);
            // console.log(io.sockets.sockets.get(c.socketId));
            // console.log(io);
            console.log("available sockets: ");
            console.log("Available sockets:", [...io.sockets.sockets.keys()]);
        }
        console.log('who are in room: ');
        console.log(io.sockets.adapter.rooms);
        // sendMessageToSocketId(`ride_${rideFinal._id}`,{event:'new-ride',data:rideFinal});
        io.to(`ride_${rideFinal._id}`).emit('new-ride',rideFinal);

        //expire after 5min

        const expireAt=Date.now()+5*60*1000;

        const delay=expireAt-Date.now();
        setTimeout(async() => {
            const ride=await rideModel.findOneAndUpdate({_id:rideFinal._id},{status:'expired'});
            console.log('sending ride gone due to ride expire');
            io.to(`ride_${ride._id}`).emit("ride-gone", {rideId:ride._id,message: 'Ride has expired'});
        }, delay);

        // captains.map((captain)=>{
        //     sendMessageToSocketId(captain.socketId,{event: 'new-ride',data: rideFinal});
        // })

        return;

        
    }
    catch(err){
        // console.log(err);
        return res.status(500).json({message: err.message});
    }


}

module.exports.getFare=async(req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
    const {pickup,destination}=req.query;
    const fare=await rideService.getFare(pickup,destination);
    return res.status(200).json(fare);

    
    }
    catch(err){
        console.log("get-fare");
        console.log(err);
        return res.status(500).json({message: err});
    }
}

module.exports.confirmAndStartRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors});
    }

    try{
        console.log(req.query);
        const ride=await rideService.confirmRide({otp:req.query.otp,rideId:req.query.rideId,captain: req.captain});
        
        return res.status(200).json(ride);
        
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}