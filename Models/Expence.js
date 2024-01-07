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
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData",
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

export const Expence=mongoose.model("Taskdata",schema);