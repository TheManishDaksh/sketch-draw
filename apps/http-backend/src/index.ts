import { userSignin, userSignup } from "@repo/zod/types";
import express from "express";
import { Jwt } from "jsonwebtoken";
import { middleware } from "./middleware";

const app = express();
app.use(express.json());

app.post("signup", (req, res)=>{
    const parsedData = userSignup.safeParse(req.body);
    if(!parsedData){
        res.status(493).json({
            message : "input error"
        })
    }
    //db integration
})

app.post("signin",middleware, (req, res)=>{
    const parsedData = userSignin.safeParse(req.body);
    if(!parsedData){
        res.status(493).json({
            message : "input error"
        })
    }
    //db find and return name and userid
})

app.post("close", (req, res)=>{
    
})

app.listen(3001)