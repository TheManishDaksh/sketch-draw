"use client"

import { useState } from "react";
import { Button, Input } from "../../../../packages/ui/src";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { userSignup } from "@repo/zod/types";
import axios from "axios";
import { HTTP_BACKEND } from "../../config";

export default function Signup(){

    const [name, setName] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ errors, setErrors] = useState<{[key : string]: string }>({})
    const router = useRouter();

    async function handleSignup(){
        const parsedData = userSignup.safeParse({
            name,
            username : email,
            password
        })
        
        if(!parsedData.success){
            const fieldErrors : {[key : string]:string} = {};
            parsedData.error.issues.forEach((issue)=>{
               const field =  issue.path[0] as string;
               fieldErrors[field] = issue.message
            })
            setErrors(fieldErrors);
            return;
        }
        setErrors({});
        try{
            const response = await axios.post(`${HTTP_BACKEND}/signup`,{
                name,
                username: email,
                password
            })
            if(!response){
                console.log("server error");
                return;
            }
        }catch(error:any){
            console.log("server error");
            return;
        }
    }
    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-slate-100 h-screen w-screen flex justify-center items-center">
            <div className="w-96 bg-white items-center flex flex-col gap-4 justify-center border border-slate-300 rounded-lg shadow-2xl px-6 py-4 ">
                <div 
                className="text-2xl font-bold">Please Signup</div>
                <div className="w-full">
                <Input label="Name : "
                placeholder="Manish daksh"
                type="text"
                onChange={(e)=>setName((e.target as HTMLInputElement)?.value)}
                value={name} />
                            { errors.name && 
            <p className="text-sm text-red-500">{errors.name}</p>
            }
            </div>

            <div className="w-full">
                <Input label="Email : "
                placeholder="manish@gmail.com"
                type="email"
                onChange={(e)=>setEmail((e.target as HTMLInputElement)?.value)}
                value={email} />
                { errors.username && 
            <p className="text-sm text-red-500">{errors.username}</p>
            }
            </div>
            <div className="w-full">
                <Input label="Password : "
                placeholder="12345678"
                type="password"
                onChange={(e)=>setPassword((e.target as HTMLInputElement)?.value)}
                value={password} />
                { errors.password && 
            <p className="text-sm text-red-500">{errors.password}</p>
            }
            </div>
            <div className="w-full"> 
                <Button className="bg-blue-500 hover:bg-blue-700" onClick={handleSignup}>Signup</Button>
            </div>
            <div className="flex text-sm">
                <p>Already have an account?</p>
                <span onClick={()=>router.push("/signin")} 
                className="underline font-semibold cursor-pointer hover:text-blue-600 transition-all duration-200">Signin</span>
            </div>
        </div>
        </motion.div>
    )
}