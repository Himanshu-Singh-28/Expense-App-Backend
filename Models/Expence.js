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
        ref: "TaskBackend",
        required: true,
    },
    createdAT:{
        type: Date,
        default: Date.now
    }
});

export const Expence=mongoose.model("Taskdata",schema);