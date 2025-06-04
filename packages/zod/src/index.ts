import { z } from "zod";

export const userSignup = z.object({
    username : z.string().min(3).max(20),
    password : z.string().min(6).max(20),
    name : z.string().min(3).max(20)
})

export const userSignin = z.object({
    username : z.string().min(3).max(20),
    password : z.string().min(6).max(20)
})

export const createUser = z.object({
    room : z.string().min(3).max(20)
})