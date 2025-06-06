import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"

export async function middleware(req:Request, res:Response, next:NextFunction){
    const token = req.headers["authorization"] ;

    if(!token){
        res.json("token not found")
    }
    const validate = jwt.verify(token as string,JWT_SECRET);

    if(validate){
        //@ts-ignore
        req.userId = validate.userId
        next();
    }else{
        res.json({message : "token is not valid"})
    }
}