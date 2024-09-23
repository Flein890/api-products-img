import mongoose from "mongoose"

export const connect = async(): Promise<void> =>{
    try {
        const url = process.env.DB_URL;
        if(!url){
            throw new Error("No URL database provided");
        }
        await mongoose.connect(url);
        console.log("Connected to DB")
    } catch (error) {
        console.error(error)
    }
}