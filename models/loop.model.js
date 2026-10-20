import mongoose from "mongoose";

const loopSchem=new mongoose.Schema({
      author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true
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

export const loopModel=mongoose.model('Loop',loopSchem)

