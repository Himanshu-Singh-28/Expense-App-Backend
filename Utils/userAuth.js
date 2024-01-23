import jwt  from "jsonwebtoken";
import { User } from "../Models/User.js";

export const userAuth=async(req,res,next)=>{
    // const token=req.session.cookies;
    // console.log(token);
    // if(!token){
    //     console.log(req.user);
    //     return res.status(404).json({
    //         success: false,
    //         message: "Longin First",
    //     });
    // }

    // const decodeddata=jwt.verify(token,process.env.JWT_SECRATE);
    
    // const user=await User.findById(decodeddata._id);
    // req.user=user._id;
    // next();
    // if(req.isAuthenticated()){
    if(req.user){
        next();
    }else{
        return res.status(401).json({
            success: false,
            message:"Login first",
        });
    }
}