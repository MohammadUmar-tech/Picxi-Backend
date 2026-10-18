import express from "express";
import dotenv from 'dotenv'
dotenv.config
import http from 'http'

const app =express()
const port=process.env.PORT||5000

app.get('/',async(req,res)=>{
    res.send('Hello we are Going to Build Picxi');
})

app.listen(port,()=>{
    console.log(`Server Started At Port ${port}`);
})