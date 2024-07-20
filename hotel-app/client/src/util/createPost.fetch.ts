import { axiosInstance } from "./axiosInstance"

export const fetchCreatePost=async(post:CreatePost)=>{
    try {
        const res=await axiosInstance.post('/posts',post)
        return res.data
    } catch (error) {
        return error
    }
}