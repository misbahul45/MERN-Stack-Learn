import express from "express";
import { authLoginAdminMiddleware, authLoginMiddleware } from "../middleware/authMiddleware.js";

const router=express.Router();

router.get('/',authLoginAdminMiddleware,(req,res)=>{
    res.send('posts')
})


export default router;