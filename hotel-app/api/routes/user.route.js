import express from "express";
import { getAllUsersController, getUserController, savedPostController, updateUserController } from "../controller/user.controller.js";
import { authLoginAdminMiddleware, authLoginMiddleware } from "../middleware/authMiddleware.js";

const router=express.Router();

router.get("/",authLoginAdminMiddleware,getAllUsersController)
router.get("/:id", getUserController)
router.patch("/:id",authLoginMiddleware, updateUserController)
router.post('/save',authLoginMiddleware, savedPostController)




export default router