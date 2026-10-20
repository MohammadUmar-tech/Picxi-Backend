import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
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
    captins:{
        type:String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

},{timestamps:true})




export const postModel=mongoose.model('Post',postSchema)