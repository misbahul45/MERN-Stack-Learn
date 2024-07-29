import { axiosInstance } from "./axiosInstance"

interface FetchAllDataPosts{
    city?:string
    type?:string
    property?:string
    minPrice?:number
    maxPrice?:number,
    userId?:string,
    get?:number
}


export const fetchGetAllPosts=async({ city, type, property, minPrice, maxPrice, userId, get }:FetchAllDataPosts):Promise<Post[] | unknown>=>{
    try {
        const res=await axiosInstance.get(`/posts`,{
            params:{
                city,
                type,
                property,
                minPrice,
                maxPrice,
                userId,
                get,
            }
        })
        return res.data as Post[]
    } catch (error) {
        return error
    }
}

export const fetchGetSinglePost=async(slug:string)=>{
    try {
        const res=await axiosInstance.get(`/posts/${slug}`)
        return res.data
    } catch (error) {
        return null
    }
}

export const fetchCreatePost=async(post:CreatePost)=>{
    try {
        const res=await axiosInstance.post('/posts',post)
        return res.data
    } catch (error) {
        return error
    }
}


export const fetchSavePost=async(postId:string)=>{
    try {
        const res=await axiosInstance.post(`/users/save`,{
            postId
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const fetchGetSavedPost=async(postId:string)=>{
    try {
        const res=await axiosInstance.get(`/posts/save/${postId}`)
        return res.data.savedPost?true:false
    } catch (error) {
        console.log(error)
        return false
    }
}

export const fetchGetAllSavedPost=async()=>{
    try {
        const res=await axiosInstance.get(`/posts/save/all`)
        return res.data as Post[]
    } catch (error) {
        console.log(error)
        return []
    }
}