import express from "express"

import { userAuth } from "../Utils/userAuth.js";
import { allExpence, deleteExpence, newExpence, updateExpence, updateExpenceDone } from "../controller/expencecntt.js";


const route=express.Router();

route.post("/newexpence",userAuth,newExpence);
route.get("/allexpence",userAuth,allExpence);
route.delete("/:id",userAuth,deleteExpence);
route.put("/done/:id",userAuth,updateExpenceDone);
route.put("/:id",userAuth,updateExpence);




export {route as expenceRoutes};