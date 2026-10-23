import { loopModel } from '../models/loop.model.js';
import { userModel } from '../models/user.model.js';


export const uploadLopp=async(req,res)=>{

      try {
          const {caption}=req.body
  
          let media;
          if(req.file){
              media=await uploadCloudinary(req.file.path)
          }
          else{
              return res.status(400).json({message:'media is required'})
          }
  
          const loop=await loopModel.create({
              media,caption,author:req.user._id
          })

          const user=await userModel(req.user._id);
          user.loops.push(loop._id)
          await user.save()
          const populatedloop=await loopModel.find({_id:loop._id}).populate("author","name userName profileImage")
  
          return res.status(201).json(populatedloop)
      } catch (error) {
        return res.status(500).json({message:`upload loop error :${error}`})
      }
}


export const like=async(req,res)=>{
    try {
        const loopId=req.params.loopId
        const loop=await loopModel.findById(loopId)
        if(!loop){
            return res.status(400).json({message:"loop not found"})
        }
        const isalreadyliked=loop.likes.some(id=> id.toString===req.user._id.toString())

        if(isalreadyliked){
            loop.likes=loop.likes.filter(id=> id.toString()!==req.user._id.toString())
        }
        else{
            loop.likes.push(req.user._id)
        }
        await loop.save()
        await loop.populate("athor","name userName profileImage")
        return res.status(201).json(loop)
    } catch (error) {
        return res.status(200).json({message:'like a loop error'})
    }
}


export const comment=async(req,res)=>{
   try {
     const {message}=req.body
     const loopId=req.params.loopId
     const loop=await loopModel.findById(loopId)
     
     if(!loop){
         return res.status(400).json({message:'loop not found'})
     }
     loop.comments.push({
         author:req.user._id,
         message
     })
     await loop.save()

     loop.populate("author","name userName profileImage")
     post.populate("comments.author")
     return res.status(200).json(loop)
   } catch (error) {
    return res.status(500).json({message:`making comment on loop error :${error}`})
   }
}


export const getAllLoop=async (req,res)=>{

   try {
     const loops=await loopModel.find({}).populate("author","name userName profileImage").populate("comments.author")
     return res.status(200).json(loops)
   } catch (error) {
    return res.status(500).json({message:`get all loop error :${error}`})
   }

}