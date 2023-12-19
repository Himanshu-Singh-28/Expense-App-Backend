import express from "express"
import { allExpence, deleteExpence, newExpence, updateExpence } from "../controller/expencecntt.js";
import { userAuth } from "../Utils/userAuth.js";


const route=express.Router();

route.post("/newexpence",userAuth,newExpence);
route.get("/allexpence",userAuth,allExpence);
route.delete("/:id",userAuth,deleteExpence);
route.put("/:id",userAuth,updateExpence);




export {route as expenceRoutes};