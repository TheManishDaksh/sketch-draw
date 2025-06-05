import { userSignin, userSignup } from "@repo/zod/types";
import express, { Request, Response } from "express";
import { middleware } from "./middleware";
import { prisma } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async(req:Request, res:Response)=>{
    const parsedData =  userSignup.safeParse(req.body);
    if(!parsedData){
        res.status(493).json({
            message : "input error"
        })
    }

   try {
     const user = await prisma.user.create({
        data : {
            name : parsedData.data?.name || "",
            username : parsedData.data?.username || "",
            password : parsedData.data?.password || ""
        }
    })
    res.json({userId : user.id})
   } catch (error: any) {
    res.status(403).json({
        message : "user can't create"
    })
   }
})

app.post("/signin",middleware, async(req: Request, res: Response)=>{
    const parsedData = userSignin.safeParse(req.body);
    if(!parsedData){
        res.status(493).json({
            message : "input error"
        })
    }
    try {
        const user = await prisma.user.findFirst({
        where : {
            username : parsedData.data?.username
        }
    })
    if(!user){
        res.json({
            message : "user not found"
        })
        return;
    }
        res.json({
            id : user.id,
            name : user.name,
            username : user.username
        })
    } catch (error:any) {
       res.status(403).json({
        message : "user can't signin"
       }) 
    }
})

app.post("/chat", (req, res)=>{
    
})

app.listen(3001)