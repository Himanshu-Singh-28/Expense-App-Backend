import express, { urlencoded } from "express"
import { ConnectDb } from "./connect/connectDb.js"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import { userRouter } from "./Routs/userRoutes.js";
import { expenceRoutes } from "./Routs/expenceRoutes.js";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import NodeCache from "node-cache";
import { PassportInitialize } from "./Utils/passportIni.js";



config({path: "./connect/config.env"});
ConnectDb();
const app=express();
export const nodecache=new NodeCache();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:false}));
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}));
app.use(session({
    secret:process.env.JWT_SECRATE,
    resave: false,
    saveUninitialized: false,
    cookie:{
        // sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
        // secure: process.env.NODE_ENV==="Development"?false: true,
        sameSite:"none",
        secure:true,
        httpOnly: false,
        maxAge:15*60*60*1000
    }
}));
app.set("trust proxy", 1);
PassportInitialize(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v2/user",userRouter);
app.use("/api/v2/expence",expenceRoutes);

app.get('/google/login',(req,res)=>{
    res.redirect('/api/v2/user/google/login');
})
app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login` }),(req,res)=>{
  res.redirect(process.env.FRONTEND_URL);}
);

app.get('/fail',(req,res)=>{
    res.json({
        success:false,
        message:"fali to login",
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on port ${process.env.PORT}`);
});
