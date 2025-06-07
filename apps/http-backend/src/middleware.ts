import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtSecret } from "@repo/backend-common/config"

export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];
    console.log(token);
    
    if (!token) {
        res.json("token not found")
        return;
    }
    try {
        const validate = jwt.verify(token, JwtSecret);

        if (validate) {
            //@ts-ignore
            req.userId = validate.id
            next();
        }
    } catch (error) {
        res.json({ message: "token is not valid" })
    }
}