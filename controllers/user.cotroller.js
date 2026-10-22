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