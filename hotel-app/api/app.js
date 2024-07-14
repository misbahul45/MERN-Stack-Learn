import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

//routes
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app=express();

//configuration
app.use(cors({
    origin:`${process.env.CLIENT_URL}`,
    Credentials:true,
    }))
app.use(express.json())
app.use(cookieParser())


//routes
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)



app.listen(8800,()=>{
    console.log("Listening on port 8800");
})

