import express from "express"

import { userAuth } from "../Utils/userAuth.js";
import { allExpence, deleteExpence, newExpence, updateExpenceData, updateExpenceDone } from "../controller/expenceContt.js";



const route=express.Router();

route.post("/newexpence",userAuth,newExpence);
route.get("/allexpence",userAuth,allExpence);
route.route("/:id").delete(userAuth,deleteExpence).put(userAuth,updateExpenceData);
route.put("/done/:id",userAuth,updateExpenceDone);


export {route as expenceRoutes};