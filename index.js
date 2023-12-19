import express from "express"
import { ConnectDb } from "./connect/connectDb.js"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import { userRouter } from "./Routs/userRoutes.js";
import { expenceRoutes } from "./Routs/expenceRoutes.js";
import cors from "cors";

config({path: "./connect/config.env"});
ConnectDb();
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}));
app.use("/api/v2/user",userRouter);
app.use("/api/v2/expence",expenceRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on port ${process.env.PORT}`)
});
