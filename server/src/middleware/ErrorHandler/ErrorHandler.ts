import { NextFunction, Request, Response } from "express";
import { ERROR_TYPE } from "../../types/Errors";



export const ErrorHandler = (err:ERROR_TYPE,req:Request,res:Response,next:NextFunction) => {
    console.error("Error:",err);
    if(!err){
        next();
    }
    res.status(err.code).json(err);
} 