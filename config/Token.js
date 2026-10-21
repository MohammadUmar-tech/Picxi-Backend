import jwt from 'jsonwebtoken'


export const genToken=(userId)=>{

   try {
     const token=jwt.sign({_id:userId},process.env.JWT_SECRET,{expiresIn:'7d'});
 
     return token
   } catch (error) {
    throw new Error(`Error occur while Token Generation ${error}`)
   }
}