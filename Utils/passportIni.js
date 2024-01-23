import { Strategy as loclaStrategy } from "passport-local";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { User } from "../Models/User.js";
import bcrypt from "bcrypt";

export const PassportInitialize = (passport) => {
  // declaearing fields
  const fieds={
    usernameField:"email"
  }

  const fieds2={
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.DEPLOY_URL}/auth/google/callback`
  }

  //declaearing cllback functions
  const callback1=async(username,password,done)=>{
    try {
      const user= await User.findOne({email:username});
      if(!user) done(null,false);
      const isMatch=await bcrypt.compare(password,user.password);
      if(isMatch){
        return done(null,user);
      }else{
        return done(null,false);
      }
      
    } catch (err) {
      done(err);
    }
  }
  const strategy1=new loclaStrategy(fieds,callback1);
  const strategy2=new googleStrategy(fieds2,(accessToken, refreshToken, user, done)=>{
      done(null,user);
  });


  passport.use(strategy1);
  passport.use(strategy2);


  // passport serializeUser and deserializeUser
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser(async(user, done) => {
    if(user.provider=='google'){
      const data={
        _id:user.id,
        name:user.displayName,
        email:user.emails[0].value,
      }
      done(null,data);
    }else
    done(null,user);
  });
};
