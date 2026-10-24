import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import cors from 'cors'
import dbConnection from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import loopRouter from './routes/loop.routes.js'
const app =express()
const port=process.env.PORT||5000
await dbConnection(process.env.MONGODB_URL)
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get('/',async(req,res)=>{
    res.send('Hello we are Going to Build Picxi');
})
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/loop',loopRouter)
app.listen(port,()=>{
    console.log(`Server Started At Port ${port}`);
})