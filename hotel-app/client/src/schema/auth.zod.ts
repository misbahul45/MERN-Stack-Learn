import { z } from "zod";

export const SignupSchema=z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string().min(8)
    .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})")),
    confirmPassword:z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})


export const SignInSchema=z.object({
    email:z.string().email(),
    password:z.string().min(8)
    .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})")),
})