import express from "express"
import { myProfil, userLogin, userLongout, userRegister } from "../controller/userCntt.js";
import { userAuth } from "../Utils/userAuth.js";
import passport from "passport";

const route=express.Router();

route.post("/login",userLogin);
route.post("/register",userRegister);
route.get("/logout",userLongout);
route.get("/myprofil",userAuth,myProfil);
route.get('/google/login',passport.authenticate('google',{scope:['profile','email']}));



export {route as userRouter};