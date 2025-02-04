import db from "../lib/prisma.js"
import {generateSlug} from "../utils/generateSlug.js"

export const getPostsController = async (req, res) => {
    const { city, type, property, minPrice, maxPrice, userId, get } = req.query;
    try {
        const posts = await db.post.findMany({
            where: {
                city: city ? { contains: city, mode: 'insensitive' } : undefined,
                type:{
                    contains: type,
                    mode: 'insensitive'
                },
                property: property,
                price: {
                    gte: minPrice?parseInt(minPrice):0,
                    lt: maxPrice?parseInt(maxPrice):undefined
                },
                userId
            },
            orderBy:{
                createdAt:'desc'         
            },
            skip:get?Number(get)*5:undefined,
            take:get?(Number(get)*5)+5:undefined
        });
        return res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ message: 'Failed to get posts' });
    }
}


export const getPostController=async(req,res)=>{
    const {slug}=req.params
    try{ 
        const dataPost=await db.post.findUnique({
            where:{
                slug
            }
        })
        if(!dataPost) return res.status(404).json({ message: 'Post not found' })
         const postDetail=await db.postDetail.findUnique({
            where:{
                postId:dataPost.id
            }
         })
         const post={
            ...dataPost,
            postDetail
         }
         const isSaved=await db.savedPost.findUnique({
             where:{
                 postId_userId:{
                     postId:dataPost.id,
                     userId:dataPost.userId
                 }
             }
         })
        return res.json({...post, isSaved:isSaved?true:false})
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

export const getSavedPostController=async(req,res)=>{
    const { postId }=req.params
    const userId=req.userId
    try {
        const savedPost=await db.savedPost.findUnique({
            where:{
                postId_userId:{
                    userId,
                    postId
                }
            }
        })
        return res.json({ savedPost:savedPost?true:false })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: 'something went wrong' })
    }
}

export const getAllPostSavedController=async(req,res)=>{
      const tokenUserId=req.userId
      try {
        const savedPosts = await db.post.findMany({
            where:{
                SavedPost:{
                    some:{
                        userId:tokenUserId,
                    }
                }
            }
        })

       
        return res.json(savedPosts || [])
      } catch (error) {
        
        res.status(404).json({ message:"something wrong!!" })
      }
}