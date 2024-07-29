import express from "express";
import { authLoginMiddleware } from "../middleware/authMiddleware.js";
import { createPostController, deletePostController, getAllPostSavedController, getPostController, getPostsController, getSavedPostController, updatePostController } from "../controller/post.controller.js";

const router=express.Router();


router.get("/", getPostsController)
router.get("/:slug", getPostController)
router.post("/",authLoginMiddleware, createPostController)

router.patch("/:id", updatePostController)
router.delete("/:id",authLoginMiddleware, deletePostController)

router.get('/save/all',authLoginMiddleware,getAllPostSavedController)
router.get('/save/:postId',authLoginMiddleware,getSavedPostController)



export default router;