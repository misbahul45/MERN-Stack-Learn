import { axiosInstance } from "./axiosInstance"

interface UpdateUser{
    id:string
    user:Partial<User>
}

export const fetchUpdateUser=async({id, user}:UpdateUser)=>{
    try {
        console.log(user)
        const res=await axiosInstance.patch(`/users/${id}`,user)
        console.log(res.data)
        return res.data
    } catch (error) {
        return error
    }
}

export const fetchGetSingleUser=async(id:string)=>{
    try {
        const res=await axiosInstance.get(`/users/${id}`)
        return res.data.user as User
    } catch (error) {
        return null
    }
}
