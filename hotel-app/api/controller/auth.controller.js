import db from "../lib/prisma.js"
import { comparePassword, hashPassword } from "../utils/hashPassword.js"
import jwt from "jsonwebtoken"

export const registerController = async(req, res) => {
    const { username, email, password } = req.body
     if(!username || !email || !password) {
         return res.status(404).json({ error: 'All fields are required' })
     }  
    //hash password
     try {
        const isRegisterUser=await db.user.findUnique({
            where:{
                email
            }
        })
        if(isRegisterUser){
            return res.status(404).json({ message:'User already exists' })
        }
        const hashedPassword=await hashPassword(password)
        const newUser=await db.user.create({
            data:{
                username,
                email,
                password:hashedPassword
            }
        })
        if(newUser){
            return res.json({ message: `User with name ${username} Successfully created` })
        }
        return res.status(404).json({ message: 'Something went wrong' })
     } catch (error) {
        return res.status(404).json({ message: 'Something went wrong' })
     }
}

export const loginController = async(req, res) => {
    const { email, password }=req.body
    if(!email || !password) {
        return res.status(404).json({ error: 'All fields are required' })
    }
    try {
        //check there is user
        const userAccount=await db.user.findUnique({
            where:{
                email
            }
        })
        if(!userAccount){
            return res.status(404).json({ message:"User not found" })
        }
        //compare password
        const checkPassword=await comparePassword(password, userAccount.password)
        if(!checkPassword){
            return res.status(404).json({ error: 'Wrong credentials' })
        }
        //generate token
        const { password:userPassword, ...userData}=userAccount 
        const age=10000*60*60
        const token=jwt.sign({
            id:userAccount.id,
        }, process.env.JWT_SECRET_KEY,{
            expiresIn:age
        })
        return res.cookie("token", token,{
            httpOnly:true,
            maxAge:age 
        }).json({
            ...userData,
        })
    } catch (error) {
        return res.status(404).json({ message: 'Something went wrong' }).status(404)
    }
}

export const logoutController = (req, res) => {
    return res.clearCookie("token").json({ message: "Successfully logged out" })
}