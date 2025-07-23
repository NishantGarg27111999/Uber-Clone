const { Server, RemoteSocket } = require('socket.io');
const userModel = require('./models/user.model')
const captianModel = require('./models/captain.model');
const captainModel = require('./models/captain.model');
const rideModel = require('./models/ride.model');


let io;
let initializeSocket = (server) => {




    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173', // <-- allow frontend origin
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {

        console.log('A client connected: ', socket.id);

        socket.on('disconnect', () => {
            console.log("A client disconnected: ", socket.id);
        })

        socket.on('join', async ({ userType, user }) => {
            console.log('A client has joined: ', socket.id);
            console.log(userType);
            if (userType == 'user') {
                await userModel.findByIdAndUpdate(user?._id, { socketId: socket.id });

            }
            else {
                console.log("user: ", user);
                await captianModel.findByIdAndUpdate(user?._id, { socketId: socket.id });
                console.log('captian updated')
            }


        });

        socket.on('update-captain-location', async ({ captainId, ltd, lng }) => {
            // console.log("locaion-update");
            // console.log({ captainId, ltd, lng });
            const r=await captainModel.findByIdAndUpdate(captainId, { location: { ltd, lng } });
            // console.log("r: ",r);
            const activeRide=await rideModel.findOne({captain:captainId,status: "accepted"}).populate('user');
            // console.log("activeRide: ",activeRide);
            if(activeRide){
                const userSocket=activeRide.user.socketId;
                io.to(userSocket).emit('captain-location-update',{ltd,lng});
            }
            
        })

        socket.on('ride-accepted', async ({rideId,captainId}) => {
            console.log('ride-accepted');
            console.log("ride-accepted hurry");
            await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'accepted',captain: captainId });
            const rideWithCaptain = await rideModel.findById(rideId).populate('captain').populate('user').select('+otp');
            console.log(rideWithCaptain);
            io.to(rideWithCaptain.user.socketId).emit('ride-accepted',rideWithCaptain);
            const acceptCaptainSocket=io.sockets.sockets.get(rideWithCaptain.captain.socketId);
            console.log('acceptSocket: ');
            console.log(acceptCaptainSocket);
            acceptCaptainSocket.to(`ride_${rideId}`).emit('ride-gone',{rideId,captainId,message: 'This ride has been taken by another captain.'})
            io.in(`ride_${rideId}`).socketsLeave(`ride_${rideId}`);

        })

        socket.on('finish-ride',async(ride)=>{
            console.log('ride finished');
            await rideModel.findOneAndUpdate({_id:ride._id},{status: 'completed'});
            io.to(ride.user.socketId).emit('ride-finished');
        })

        socket.on('cancel-ride',(socketId)=>{
            console.log('cancel ride ', socketId);
            io.to(socketId).emit('ride-cancelled');
        })
    })


    // setInterval(() => {
    //     console.log("i am running");
    //     sendMessage('hello');
    // }, 2000);

    // setTimeout(()=>{
    //     sendMessage({
    //         user:{
    //             fullname:{
    //                 firstname:'devil'
    //             }
    //         }
    //     })
        
    // },200);
    sendMessage('hello');

    
   
}

function sendMessageToSocketId(socketId, message) {
    if (io) {
        console.log('sent new-ride');
        io.to(socketId).emit(message.event, message.data);
    }
    else {
        console.log('Socket.io not initialized');
    }
}

function sendMessage(message){
    // console.log('sending...');
    io.emit('ride-accepted',message);
}
function getIo(){
    return io;
}



module.exports = { initializeSocket, sendMessageToSocketId,getIo }