// import jwt  from "jsonwebtoken";
// import session from "express-session";

// export const sendcookie=(user_id,res,message,statusCode=200)=>{
//     const token=jwt.sign({_id: user_id},process.env.JWT_SECRATE);
//     res.status(statusCode).session.cookie("token",token,{
//         httpOnly:true,
//         maxAge: 24*60*60*1000,
//         sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
//         secure: process.env.NODE_ENV==="Development"?false: true,
//     }).json({
//         success: true,
//         message: message,
//     });
// }