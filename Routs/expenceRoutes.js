import express from "express"

import { userAuth } from "../Utils/userAuth.js";
import { allExpence, deleteExpence, newExpence, updateExpence, updateExpenceDone } from "../controller/expencecntt.js";


const route=express.Router();

route.post("/newexpence",userAuth,newExpence);
route.get("/allexpence",userAuth,allExpence);
route.route("/:id").delete(userAuth,deleteExpence).put(userAuth,updateExpence);
route.put("/done/:id",userAuth,updateExpenceDone);


export {route as expenceRoutes};