
import {Expence}  from "../Models/Expence.js";


export const newExpence= async (req,res)=>{
    let {title,amount,date}= req.body;
    const expence= await Expence.create({
        title,
        amount,
        user: req.user,
        createdAT: date,
    });
    res.status(200).json({
        success : true,
        message: "Expence added successfully",
    });
    
}

export const allExpence=async (req,res)=>{
    const expencedata=await Expence.find({user: req.user});
    res.json({
        success: true,
        data: expencedata,
    });
}

export const deleteExpence=async(req,res)=>{
    const ExpenceId=req.params.id;

    const userExp=await Expence.findById(ExpenceId);
    if(!userExp){
        return res.status(404).json({
            success: false,
            message: "no such id",
        });
    }
    await userExp.deleteOne();
    return res.json({
        success: true,
        message: "expence deleted successfully",
    });
}
export const updateExpenceDone=async(req,res)=>{
    const ExpenceId=req.params.id;

    const userExp=await Expence.findById(ExpenceId);
    if(!userExp){
        return res.status(404).json({
            success: false,
            message: "no such id",
        });
    }
    userExp.isCompleted=!userExp.isCompleted;

    await userExp.save();
    return res.json({
        success: true,
        message: "expence updated successfully",
    });
}

export const updateExpence=async(req,res)=>{
    const ExpenceId=req.params.id;
    let {title,amount}=req.body;
    const userExp=await Expence.findById(ExpenceId);
    if(!userExp){
        return res.status(404).json({
            success: false,
            message: "no such id",
        });
    }
    if(!amount){
        userExp.title=title;
    }else{
        userExp.title=title;
        userExp.amount=amount;
    }

    await userExp.save();
    return res.json({
        success: true,
        message: "expence updated successfully",
    });
}