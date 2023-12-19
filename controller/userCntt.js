import { User } from "../Models/User.js";
import { sendcookie } from "../Utils/sendcookies.js";
import bcrypt from "bcrypt";

export const userLogin=async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email:email});

    if(!user){
        return res.json({
            success: false,
            message:"Invalid email or password",
        });
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({
            success: false,
            message: "Invalid email or password",
        });
    }
    sendcookie(user,res,"Login Sucessfull",200);
       
}

export const userRegister=async(req,res,next)=>{
    const {name,email,password}=req.body;
    let user = await User.findOne({email:email});
    if(user && user.email==email){
        return res.status(404).json({
            success:false,
            message:"Email already in use",
        })
    }
    const hashedpassword=await bcrypt.hash(password,10);

    user=await User.create({
        name,
        email,
        password: hashedpassword,
    });
    res.json({
        success: true,
        message: "Registered successfully",
    })
    
}

export const userLongout=(req,res)=>{
    res.status(200).cookie("token","",{
        maxAge:0
    }).json({
        success:true,
        message: "Long out Successfully",
    })
}

export const myProfil=(req,res)=>{
    res.status(200).json({
        success:true,
        user: req.user
    });
}