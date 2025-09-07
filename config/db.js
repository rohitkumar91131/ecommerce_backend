import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config();
connectToDb()
.then(()=>{
    console.log("Connected with database ")
})
.catch((err)=>{
    console.log(err || "Error in db connection")
})
console.log("process.env.MONGO_URL")
async function connectToDb() {
    await mongoose.connect("mongodb+srv://Rohit:gHESgB0Lh2rpMsmj@cluster.nsx2q.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster");
}

