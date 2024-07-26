import express from "express";
import { getAllUsersController, getUserController, updateUserController, savedPostController } from "../controller/user.controller.js";
import { authLoginAdminMiddleware, authLoginMiddleware } from "../middleware/authMiddleware.js";

const router=express.Router();

router.get("/",authLoginAdminMiddleware,getAllUsersController)
router.get("/:id",authLoginMiddleware, getUserController)
router.patch("/:id",authLoginMiddleware, updateUserController)
router.post('/save',authLoginMiddleware, savedPostController)




export default router