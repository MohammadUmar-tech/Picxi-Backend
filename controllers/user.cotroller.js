import { uploadCloudinary } from "../config/cloudinary.js";
import { userModel } from "../models/user.model.js";

export const getUser=async(req,res)=>{
    try {
        
        const userId=req.user._id;
        const user=await userModel.findOne({
            _id:userId
        })
        if(!user){
            return res.status(400).json({message:'User Not found'})
        }

        return res.status(200).json(user)

    } catch (error) {
        return re.status(500).json({message:`User Finding Error :${error}`})
    }
}


export const getSuggestedUser=async(req,res)=>{
    try {
        const users=await userModel.find({
            _id:{$ne:req.user._id}
        }).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({message:`get Suggested User error :${error}`})
    }
}
export const editProfile=async(req,res)=>{

    try {
        const {name,userName,bio,gender,profession}=req.body
    
        const user=await userModel.findById(req.user._id).select("-password")
    
        if(!user){
            return res.status(400).json({message:'User not found'})
        }
    
        const isUserExist=await userModel.findOne({userName}).select("-password")
    
        if(isUserExist && isUserExist._id!==req.user._id){
            return res.status(400).json({message:'Username already Taken'})
        }
        let profileImage;
        if(req.file){
            profileImage=await uploadCloudinary(req.file.path)
        }
        user.userName=userName
        user.bio=bio,
        user.profession=profession
        user.name=name,
        user.gender=gender
        user.profileImage=profileImage
    
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}


export const getProfile=async (req,res)=>{
   try {
     const userName=req.params.userName
     const user=await userModel.findOne({userName}).select("-password")
     if(!user){
         return res.status(400).json({message:'User Not Found'})
     }
     return res.status(200).json(user);
   } catch (error) {
    return res.status(500).json({message:`get Profile error : ${error}`})
   }

}