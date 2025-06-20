"use client"

import { useState } from "react";
import { Button, Input } from "../../../../packages/ui/src";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { HTTP_BACKEND } from "../../config";
import { userSignin } from "@repo/zod/types";

export default function Signin(){

    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ roomName, setRoomName] = useState("");
    const router = useRouter();

    async function handleLogin(){
        const parsedData = userSignin.safeParse({
                username : email,
                password
        })
        if(!parsedData.success){
            console.log("input error");
            return;
        }
        try{
            const response = await axios.post(`${HTTP_BACKEND}/signin`,{
            username : email,
            password
        })
        if(!response){
            console.log("server error");
            return;
        }
        const token = response.data.token;
        const userId = response.data.userId;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        }catch(error:any){
            console.log(error.data.message);
            return;
        }
    }
    return (
        <div className="bg-slate-100 h-screen w-screen flex justify-center items-center">
            <motion.div  initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
            className="w-96 bg-white items-center flex flex-col gap-6 justify-center border border-slate-300 rounded-lg shadow-2xl px-6 py-4 ">
                <div className="text-2xl font-bold">Welcome Back, please login</div>
            <div className="w-full">
                <Input label="Email : "
                placeholder="manish@gmail.com"
                type="email"
                onChange={(e : MouseEvent)=>setEmail((e.target as HTMLInputElement)?.value)}
                value={email} />
            </div>
            <div className="w-full">
                <Input label="Password : "
                placeholder="12345678"
                type="password"
                onChange={(e : MouseEvent)=>setPassword((e.target as HTMLInputElement)?.value)}
                value={password} />
            </div>
            <div className="w-full">
                <Input label="Create/Join room : "
                placeholder="room name"
                type="text"
                onChange={(e : MouseEvent)=>setRoomName((e.target as HTMLInputElement)?.value)}
                value={roomName} />
            </div>
            <div className="w-full">
                <Button  onClick={handleLogin}>Login</Button>
            </div>
            <div className="flex text-sm">
                <p>Don't have an account?</p>
                <span onClick={()=>router.push("/signup")} 
                className="underline font-semibold cursor-pointer hover:text-blue-600 transition-all duration-200">Signup</span>
            </div>
        </motion.div>
        </div>
    )
}