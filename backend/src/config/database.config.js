import mongoose from "mongoose";
import { APP_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URI}/${APP_NAME}`);
        console.log("DATABASE CONNECTED");
    } catch (error) {
        console.log("!!! DATABASE CONNECTION ERROR !!!");
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;