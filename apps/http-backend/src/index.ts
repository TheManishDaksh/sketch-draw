import { createRoom, userSignin, userSignup } from "@repo/zod/types";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { prisma } from "@repo/db";
import { JWT_SECRET } from "@repo/backend-common/config";

const app = express();
app.use(express.json());

app.post("/signup", async(req:Request, res:Response)=>{
    const parsedData =  userSignup.safeParse(req.body);
    if(!parsedData.success){
        res.status(493).json({
            message : "input error"
        })
    }

   try {
    const existingUser = await prisma.user.findFirst({
        where : {
            username : parsedData.data?.username
        }
    }) 
    if(existingUser){
        res.json({message : "user already exist"})
        return;
    }
    const hashedPassword = await bcrypt.hash(parsedData.data?.password ??"", 10)
     const user = await prisma.user.create({
        data : {
            name : parsedData.data?.name || "",
            username : parsedData.data?.username || "",
            password : hashedPassword
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
    if(!parsedData.success){
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
    const validatePassword = await bcrypt.compare(parsedData.data?.password ?? "", user.password)
    if(!validatePassword){
        res.json({
            message : "password does'nt match"
        })
    }
    const token = Jwt.sign(user?.username, JWT_SECRET)
        res.json({
            userId : user.id,
            name : user.name,
            token
        })
    } catch (error:any) {
       res.status(403).json({
        message : "user can't signin"
       }) 
    }
})

app.post("/room", async(req, res)=>{
    const parsedData = createRoom.safeParse(req.body)
    if(!parsedData.success){
        res.json({
            messages : "input error"
        })
    }
    try {
        const room = await prisma.room.create({
        data : {
            slug : parsedData.data?.name!,
            //@ts-ignore
            adminId : req.userId
        }
    })
    res.json({
        roomId : room?.id
    })
    } catch (error:any) {
      res.json({
        message : "room can't created"
      })  
    }
})

app.listen(3001)