import express from "express";
import { authLoginMiddleware } from "../middleware/authMiddleware.js";
import { createPostController, deletePostController, getPostController, getPostsController, updatePostController } from "../controller/post.controller.js";

const router=express.Router();


router.get("/", getPostsController)
router.get("/:slug", getPostController)
router.post("/",authLoginMiddleware, createPostController)

router.patch("/:id", updatePostController)
router.delete("/:id",authLoginMiddleware, deletePostController)


export default router;