const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const cors=require("cors");

const app=express();
const userRoutes=require('./routes/user.routes');

const connectToDb=require('./db/db');
connectToDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT=process.env.PORT||3000;

app.get("/",(req,res,next)=>{
    res.send("hello uber");
})

app.use('/user',userRoutes);


app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})