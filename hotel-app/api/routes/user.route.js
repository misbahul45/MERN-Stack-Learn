import express from "express";
import { getAllUsersController, getUserController } from "../controller/user.controller.js";
import { authLoginAdminMiddleware, authLoginMiddleware } from "../middleware/authMiddleware.js";

const router=express.Router();

router.get("/",authLoginAdminMiddleware,getAllUsersController)
router.get("/:id",authLoginMiddleware, getUserController)
router.patch("/:id",authLoginMiddleware, getUserController)



export default router