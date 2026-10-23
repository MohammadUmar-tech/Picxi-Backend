import { uploadCloudinary } from "../config/cloudinary.js";
import { upload } from "../config/multer.js";
import { postModel } from "../models/post.model.js";
import { userModel } from "../models/user.model.js";

export const uploadPost=async(req,res)=>{

      try {
          const {mediaType,caption}=req.body
  
          let media;
          if(req.file){
              media=await uploadCloudinary(req.file.path)
          }
          else{
              return res.status(400).json({message:'media is required'})
          }
  
          const post=await postModel.create({
              media,mediaType,caption,author:req.user._id
          })

          const user=await userModel(req.user._id);
          user.posts.push(post._id)
          await user.save()
          const populatedPost=await postModel.find({_id:post._id}).populate("author","name userName profileImage")
  
          return res.status(201).json(populatedPost)
      } catch (error) {
        return res.status(500).json({message:`upload post error :${error}`})
      }



}

export const getAllPost=async (req,res)=>{

   try {
     const posts=await postModel.find({}).populate("author","name userName profileImage");
     return res.status(200).json(posts)
   } catch (error) {
    return res.status(500).json({message:`get all post error :${error}`})
   }

}

export const like=async(req,res)=>{
    try {
        const postId=req.params.postId
        const post=await postModel.findById(postId)
        if(!post){
            return res.status(400).json({message:"post not found"})
        }
        const isalreadyliked=post.likes.some(id=> id.toString===req.user._id.toString())

        if(isalreadyliked){
            post.likes=post.likes.filter(id=> id.toString()!==req.user._id.toString())
        }
        else{
            post.likes.push(req.user._id)
        }
        await post.save()
        await post.populate("athor","name userName profileImage")
        return res.status(201).json(post)
    } catch (error) {
        return res.status(200).json({message:'like a post error'})
    }
}


export const comment=async(req,res)=>{
   try {
     const {message}=req.body
     const postId=req.params.postId
     const post=await postModel.findById(postId)
     
     if(!post){
         return res.status(400).json({message:'Post not found'})
     }
     post.comments.push({
         author:req.user._id,
         message
     })
     await post.save()

     post.populate('user',"name userName profileImage")
     post.populate('comments.author')
     return res.status(200).json(post)
   } catch (error) {
    return res.status(500).json({message:`making comment error :${error}`})
   }
}

export const saved=async (req,res)=>{
        try {
        const postId=req.params.postId
        const user=await userModel.findById(req.user._id)
        const isalreadysaved=user.saved.some(id=> id.toString===postId.toString())

        if(isalreadysaved){
            user.saved=user.saved.filter(id=> id.toString()!==postId.toString())
        }
        else{
            user.saved.push(postId)
        }
        await user.save()
        await user.populate("saved")
        return res.status(201).json(user)
    } catch (error) {
        return res.status(200).json({message:'save a post error'})
    }
}