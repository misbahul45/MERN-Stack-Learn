import db from "../lib/prisma.js"
import { hashPassword } from "../utils/hashPassword.js"

export const getAllUsersController = async (req, res) => {
    try {
        const users=await db.user.findMany({})
        return res.json(users)
    } catch (error) {
        return res.status(404).json({ message: 'Something went wrong' })
    }
}

export const getUserController = async (req, res) => {
    try {
        const userId=req.params.id
        if(!userId) return res.json({ message: 'Require user id' })
        const {password, ...userData}=await db.user.findUnique({
            where:{
                id:userId
            }
        })
        return res.json({ user:userData })
    } catch (error) {
        return res.status(404).json({ message: 'Something went wrong' })
    }
}

export const updateUserController = async (req, res) => {
    try {
        const { password:updatePassword , avatar,...dataUpdate }=req.body
        const userId=req.params.id
        const tokenUserId=req.userId

        if(!dataUpdate) return res.status(404).json({ message: 'Require data update' })
        if(!userId) return res.status(404).json({ message: 'Require user id' })
        if(userId!==tokenUserId) return res.status(404).json({ message: 'Not authorized' }) 
        
        let hashedUpdatePassword=null
        if(updatePassword){
            hashedUpdatePassword=await hashPassword(updatePassword)
        }
        
        const updatedUser=await db.user.update({
            where:{
                id:userId
            },
            data:{
                ...dataUpdate,
                ...(avatar && {avatar}),
                ...(updatePassword && {password:hashedUpdatePassword})
            }
        })
        const { password,...dataUser }=updatedUser
        return res.json({ ...dataUser })
    } catch (error) {
        return res.status(404).json({ message: 'Something went wrong' })
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const userId=req.params.id
        if(!userId) return res.status(404).json({ message: 'Require user id' })
        if(userId!==req.userId) return res.status(404).json({ message: 'Not authorized' })
        
        const deleteUser=await db.user.delete({
            where:{
                id:userId
            }
        })
        return res.json({ message:`Successfully deleted user ${deleteUser.name}` })
    } catch (error) {
        return res.status(404).json({ message: 'Something went wrong' })   
    }
}

export const savedPostController=async(req,res)=>{
    const { postId } = req.body
    const userId=req.userId
    try {
        if(!postId) return res.status(404).json({ message: 'Require post id' })
        const savedPost=await db.savedPost.findUnique({
            where:{
                postId_userId:{
                    userId,
                    postId
                }
            }
        })
        if(savedPost){
            await db.savedPost.delete({
                where:{
                    id:savedPost.id
                }
            })
            return res.json({ save:true })
        } else{
            await db.savedPost.create({
                data:{
                    userId,
                    postId
                }
            })
            return res.json({ save:false })
        }   

    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'something went wrong' })
    }
}
