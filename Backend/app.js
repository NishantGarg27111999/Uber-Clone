const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const cors=require("cors");
const cookieParser=require('cookie-parser');
const {initializeSocket, sendMessageToSocketId}=require('./socket.js');

const http=require('http');


const app=express();
const server=http.createServer(app);

initializeSocket(server);
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captian.routes');
const mapRoutes=require('./routes/map.routes');
const rideRoutes=require('./routes/ride.routes');
const connectToDb=require('./db/db');
connectToDb();






app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


const PORT=process.env.PORT||3000;

app.get("/",(req,res,next)=>{
    res.send("hello uber");
})

app.use('/user',userRoutes);
app.use('/captains',captainRoutes);
app.use('/map',mapRoutes);
app.use('/ride',rideRoutes);

// sendMessageToSocketId({
//     "user": "67f12727a777f20ffe138e0a",
//     "pickup": "Delhi, India",
//     "destination": "panipat",
//     "fare": 1072,
//     "status": "pending",
//     "otp": null,
//     "_id": "6868b2343b376f3673a2f32e",
//     "__v": 0
// });
// setInterval(()=>{
//     sendMessageToSocketId({
//     "user": "67f12727a777f20ffe138e0a",
//     "pickup": "Delhi, India",
//     "destination": "panipat",
//     "fare": 1072,
//     "status": "pending",
//     "otp": null,
//     "_id": "6868b2343b376f3673a2f32e",
//     "__v": 0
// })
// },10000);


server.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})