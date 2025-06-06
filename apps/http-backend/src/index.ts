import { createRoom, userSignin, userSignup } from "@repo/zod/types";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import cors from "cors"
import { middleware } from "./middleware";
import { prismaClient } from "@repo/db/client";
import { JWT_SECRET } from "@repo/backend-common/config";

const app = express();
app.use(express.json());
app.use(cors())

app.post("/signup", async(req:Request, res:Response)=>{
    const parsedData =  userSignup.safeParse(req.body);
    if(!parsedData.success){
        res.status(493).json({
            message : "input error"
        })
    }

   try {
    const existingUser = await prismaClient.user.findFirst({
        where : {
            username : parsedData.data?.username
        }
    }) 
    if(existingUser){
        res.json({message : "user already exist"})
        return;
    }
    const hashedPassword = await bcrypt.hash(parsedData.data?.password ??"", 10)
     const user = await prismaClient.user.create({
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

app.post("/signin", async(req: Request, res: Response)=>{
    const parsedData = userSignin.safeParse(req.body);
    if(!parsedData.success){
        res.status(493).json({
            message : "input error"
        })
        return;
    }
    
    try {
        const user = await prismaClient.user.findFirst({
        where : {
            username : parsedData.data?.username,
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

app.post("/room", middleware, async(req, res)=>{
    const parsedData = createRoom.safeParse(req.body);
    if(!parsedData.success){
        res.status(411).json({
            messages : "input error"
        })
        return;
    }
    try {
        const existingRoom = await prismaClient.room.findFirst({
            where : {
                slug : parsedData.data.name
            }
        })
        if(existingRoom){
            res.json({
                message : "room already exist"
            })
        }
    } catch (error:any) {
        res.status(403).json({
            message : "room found error"
        })
    }

     //@ts-ignore 
    const userId = req.userId
    try {
        const room = await prismaClient.room.create({
        data : {
            slug : parsedData.data?.name,
            adminId : userId
        }
    })
    res.json({
        roomId : room?.id
    })
    } catch (error:any) {
        console.log(error);
        
      res.status(411).json({
        message : "room can't created"
      })  
    }
})

app.listen(3001)