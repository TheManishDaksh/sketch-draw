import { z } from "zod";

export const userSignup = z.object({
    username : z.string().min(3).max(40,{message : "username should be minimum 3 words "}),
    password : z.string().min(6).max(20,{ message : "password should be min 6 words"}),
    name : z.string().min(3).max(20, { message : "name should be minimum 6 words"})
})

export const userSignin = z.object({
    username : z.string().min(3).max(40, {message : "username must be min 3 words"}),
    password : z.string().min(6).max(20, {message : "password should be min 6 words"})
})

export const createRoom = z.object({
    name : z.string().min(3).max(20,{message : "room name should be min 3 words"})
})