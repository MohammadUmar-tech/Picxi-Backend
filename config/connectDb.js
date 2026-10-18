import mongoose  from "mongoose";

const dbConnection=async (URL)=>{
    try {
        const connection=await mongoose.connect(URL)
        if(connection){
            console.log('Data Base Connected Successfully')
        }
    } catch (error) {
        console.log(`Error cocur while connecting to data base ${error}`)
    }


}

export default  dbConnection