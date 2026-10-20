import mongoose from "mongoose";

const storySchema=new mongoose.Schema({
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true
        },
        mediaType:{
            tyep:String,
            enum:["image","video"],
            required:true
        },
        media:{
            type:String,
            required:true
        },
        viewers:[
            {
              type:mongoose.Schema.Types.ObjectId,
              ref:"User",
              required:true  
            }
        ],
        createdAt:{
            type:Date,
            default:Date.now(),
            expires:86400
        }
},{timestamps:true})

export const storyModel=mongoose.model('Story',storySchema)