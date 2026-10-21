import { genToken } from "../config/Token.js";
import { userModel } from "../models/user.model.js";
import bcrypt from 'bcrypt'

const options={
    httpOnly:true,
    maxAge:7*24*60*60*1000,
    secure:false,
    sameSite:'Strict'
}


export const singUp=async(req,res)=>{
    try {
        const {email,password,userName,name}=req.body;
          if(!email||!password||!userName||!name){
            return res.status(400).json({message:"All feils are required"})
        }

        if(password.lenght<6){
            return res.status(404).json({message:'Password Must be 6 character Long'})
        }

        const isEmailExist=await userModel.findOne({
            email
        })
    
        if(isEmailExist){
            return res.json(400).json({message:'email already Exist'})
        }
    
        const isuserNameExist=await userModel.findOne({
            userName
        })
    
        if(isuserNameExist){
            return res.json(400).json({message:'Username already Exist'})
        }

        



        const hash=await bcrypt.hash(password,10);
        const user=await userModel.create({
            email,
            name,
            userName,
            password:hash
        })
        
        const token=genToken(user._id)
        res.cookie('token',token,options)
    
        return res.status(200).json(user,token)
    
    } catch (error) {
        return res.status(500).json({message:` signUp Error :${error}`})
    }

}



export const login=async (req,res)=>{
      try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:"email and password are required"})
        }
    
        const user=await userModel.findOne({
            email
        })
    
        if(!user){
            return res.json(400).json({message:'email does not Exist'})
        }
        if(!await bcrypt.compare(password,user.passwod)){
            return res.status(400).json({message:'Password Incorrect'})
        }
        const token=genToken(user._id)
        res.cookie('token',token,options)
    
        return res.status(200).json(user,token)
    
    } catch (error) {
        return res.status(500).json({message:` login Error :${error}`})
    }
}

export const logOut=async(req,res)=>{
    try {
        res.clearCookie('token')
        return res.status(200).json({message:'User logout Successfully'})
    } catch (error) {
        return res.status(500).json({message:` Logout Error :${error}`})
    }
}