import express from "express";
import { authLoginMiddleware } from "../middleware/authMiddleware.js";
import { createPostController, deletePostController, getPostController, getPostsController, updatePostController } from "../controller/post.controller.js";

const router=express.Router();


router.get("/",authLoginMiddleware, getPostsController)
router.get("/:slug",authLoginMiddleware, getPostController)
router.post("/",authLoginMiddleware, createPostController)

router.patch("/:id",authLoginMiddleware, updatePostController)
router.delete("/:id",authLoginMiddleware, deletePostController)


export default router;