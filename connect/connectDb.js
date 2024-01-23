import mongoose from "mongoose";

export const ConnectDb=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName: "ExpenseBackend",
    }).then(()=>{
        console.log("DataBase Connected");
    }).catch((e)=>{
        console.log(e);
    });
}

