import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
export const transporter=nodemailer.createTransport({

      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'mohumar0240@gmail.com',
        pass: process.env.NODEMAILER_PASS.trim()
      }

})


export const sendMail=async (to,otp)=>{

    await transporter.sendMail({
    from:'mohumar0240@gmail.com',
    to,
    subject:'Reset Your Password Through Otp',
    html:`<p>Your OTP to reset password is ${otp}.It expires in 5 min</p>`
    })




}