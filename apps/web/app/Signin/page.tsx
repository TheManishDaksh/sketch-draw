"use client";

import { useState } from "react";
import { Button, Input } from "../../../../packages/ui/src";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { HTTP_BACKEND } from "../../config";
import { createRoom, userSignin } from "@repo/zod/types";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errors, setErrors] = useState<{[key:string]:string}>({});
  const [ roomErrors, setRoomErrors] = useState<{[key:string]:string}>({});
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  async function handleLogin() {
    const parsedData = userSignin.safeParse({
      username: email,
      password,
    });
    const parsedRoom = createRoom.safeParse({
      slug : roomName,
    });
    if (!parsedData.success) {
  const fieldError: { [key: string]: string } = {};
  parsedData.error.issues.forEach(issue => {
    const field = issue.path[0] as string;
    fieldError[field] = issue.message;
  });
  setErrors(fieldError);
} else {
  setErrors({});
}
if (!parsedRoom.success) {
  const fieldError: { [key: string]: string } = {};
  parsedRoom.error.issues.forEach(issue => {
    const field = issue.path[0] as string;
    fieldError[field] = issue.message;
  });
  setRoomErrors(fieldError);
} else {
  setRoomErrors({});
} 

if (!parsedData.success || !parsedRoom.success) return;
    try {
      const response = await axios.post(`${HTTP_BACKEND}/signin`, {
        username: email,
        password,
      });
      if (!response) {
        console.log("server error");
        return;
      }
      alert("user signin");
            const token = response.data.token;
      localStorage.setItem("token", token);
      try {
        const room = await axios.post(`${HTTP_BACKEND}/room`, {
          slug : roomName,
        },{
        headers : {
            Authorization : localStorage.getItem("token")
        }});
        if (!room) {
          console.log("server error");
          return;
        }
        const roomId = room.data.roomId;
        router.push(`/canvas/${roomId}`);
        alert("room created")
      } catch (error: any) {
        console.log("server error in creating room");
        return;
      }

    } catch (error: any) {
      console.log(error.response.data.message || "server error in singin");
      return;
    }
  }
  return (
    <div className="bg-slate-100 h-screen w-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-96 bg-white items-center flex flex-col gap-6 justify-center border border-slate-300 rounded-lg shadow-2xl px-6 py-4 "
      >
        <div className="text-2xl font-bold">Welcome Back, please login</div>
        <div className="w-full">
          <Input
            label="Email : "
            placeholder="manish@gmail.com"
            type="email"
            onChange={(e) =>
              setEmail((e.target as HTMLInputElement)?.value)
            }
            value={email}
          />
           { errors.username && 
                <p className="text-sm text-red-500">{errors.username}</p>
            }
        </div>
        <div className="w-full">
          <Input
            label="Password : "
            placeholder="12345678"
            type="password"
            onChange={(e) =>
              setPassword((e.target as HTMLInputElement)?.value)
            }
            value={password}
          />
           { errors.password && 
                <p className="text-sm text-red-500">{errors.password}</p>
            }
        </div>
        <div className="w-full">
          <Input
            label="Create/Join room : "
            placeholder="room name"
            type="text"
            onChange={(e) =>
              setRoomName((e.target as HTMLInputElement)?.value)
            }
            value={roomName}
          />
           { roomErrors.name && 
                <p className="text-sm text-red-500">{roomErrors.name}</p>
            }
        </div>
        <div className="w-full">
          <Button className="bg-blue-500 hover:bg-blue-700" onClick={handleLogin}>Login</Button>
        </div>
        <div className="flex text-sm">
          <p>Don't have an account?</p>
          <span
            onClick={() => router.push("/signup")}
            className="underline font-semibold cursor-pointer hover:text-blue-600 transition-all duration-200"
          >
            Signup
          </span>
        </div>
      </motion.div>
    </div>
  );
}
