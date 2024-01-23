
import {Expence}  from "../Models/Expence.js";


export const newExpence= async (req,res)=>{
    let {title,amount,date,type}= req.body;
    const expence= await Expence.create({
        title,
        amount,
        user: req.user._id,
        createdAT: date,
        Type:type,
    });
    res.status(200).json({
        success : true,
        message: "Expence added successfully",
    });
    
}

export const allExpence=async (req,res)=>{
    const expencedata=await Expence.find({user: req.user._id});
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

export const updateExpenceData=async(req,res)=>{
    const ExpenceId=req.params.id;
    let {title,amount,type}=req.body;
    const userExp=await Expence.findById(ExpenceId);
    if(!userExp){
        return res.status(404).json({
            success: false,
            message: "no such id",
        });
    }
    if(!amount){
        userExp.title=title;
        userExp.Type=type;
    }else{
        userExp.title=title;
        userExp.amount=amount;
        userExp.Type=type;
    }

    await userExp.save();
    return res.json({
        success: true,
        message: "expence updated successfully",
    });
}