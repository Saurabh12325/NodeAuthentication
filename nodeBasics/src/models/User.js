import e from "express";
import mongoose from "mongoose";
import validator from "validator";



const otpsSchema = new mongoose.Schema({
    code: {
        type: String
       },
       expiresAt : {
        type : Date
       }
}
    )
const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : [true, "Username is required"],
        trim : true,

    },
    email : {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          lowercase: true,
          validate: [validator.isEmail, 'Invalid email']

    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : [6, "Password must be at least 6 characters long"]
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
     isVerified: { type: Boolean, default: false },
    otps: otpsSchema,
     refreshToken: { type: String }
    
        
}, { timestamps: true })
export const User = mongoose.model('User', userSchema);