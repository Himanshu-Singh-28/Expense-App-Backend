import mongoose from "mongoose";

const schema=mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    user:{
        type: String,
        required: true,
    },
    createdAT:{
        type: Date,
        default:Date.now,
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    Type:{
        type:String,
        default:"Give"
    }
});

export const Expence=mongoose.model("Expensedata",schema);