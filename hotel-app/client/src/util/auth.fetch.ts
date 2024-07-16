import { axiosInstance } from "./axiosInstance"

interface CreateUser{
    username:string
    email:string
    password:string
}

export const createUser=async(user:CreateUser)=>{
    try {
        const res=await axiosInstance.post('/auth/register',user)
        return res.data
    } catch (error) {
        return error
    }
}

export const loginUser=async(user:Partial<CreateUser>)=>{
    try {
        const res=await axiosInstance.post('/auth/login',user)
        return res.data
    } catch (error) {
        return error
    }
}