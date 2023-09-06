import { NextFunction, Request, Response } from "express";
import { ERROR_TYPE } from "../../Types/Errors";


export const ErrorHandler = (err:ERROR_TYPE,req:Request,res:Response,next:NextFunction) => {
    console.log("Weszło!")
    console.error("Error:",err);
    if(!err){
        next();
    }
    res.status(err.code).json(err);
} 