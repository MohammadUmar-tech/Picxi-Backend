import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    loops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Loop" }],
    story :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Story"
    },
    resetOtp:{
      type:String,
    },
    isOptVerified:{
      type:Boolean,
      default:false
    },
    OptExpires:{
      type:Date,
    }




  },
  { timestamps: true },
);

export const userModel = mongoose.model("User", userSchema);
