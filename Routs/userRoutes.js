import express from "express"
import { myProfil, userLogin, userLongout, userRegister } from "../controller/userCntt.js";
import { userAuth } from "../Utils/userAuth.js";

const route=express.Router();

route.post("/login",userLogin);
route.post("/register",userRegister);
route.get("/logout",userLongout);
route.get("/myprofil",userAuth,myProfil);



export {route as userRouter};