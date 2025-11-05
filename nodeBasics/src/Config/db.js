import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }catch(err){
        console.error("MongoDB connection error:", err);
        throw err;
    }
}
export default connectDb;