import db from "../lib/prisma.js"
import {generateSlug} from "../utils/generateSlug.js"

export const getPostsController=async(req,res)=>{
    try {
        const posts=await db.post.findMany({})
        return  res.json(posts) 

    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'failed get Posts' })
    }
}

export const getPostController=async(req,res)=>{
    try {
        const post=await db.post.findUnique({
            where:{
                slug:req.paramss.slug
            }
        })
        return res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'failed get Post' })
    }
}

export const createPostController=async(req,res)=>{
    try {
        const {postDetail, ...dataPost}=req.body
        const userId=req.userId
        const slugPost=generateSlug(dataPost.title)
        const post=await db.post.create({
            data:{
                ...dataPost,
                slug:slugPost,
                userId,
                postDetail:{
                    create:{
                        ...postDetail
                    }
                }
            }
        })
        return res.json({ message: `${post.title} successfully created` })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'failed create Post' })
    }
}
export const updatePostController=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'failed update Post' })
    }
}
export const deletePostController=async(req,res)=>{
    const tokenUserId=req.userId
    try {
        const post=await db.post.get({
            where:{
                id:req.params.id
            }
        })

        if(tokenUserId!==post.userId) return res.status(404).json({ message: 'Not authorized' })
         
        await db.post.delete({
            where:{
                id:req.params.id
            }
        })

        return res.json({ message: `${post.title} successfully deleted` })

    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'failed delete Posts' })
    }
}