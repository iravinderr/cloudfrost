import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import connectDB from "./config/database.config.js";
import app from "./app.js";

const PORT = process.env.PORT || 8000;


connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER IS LIVE AT PORT ${PORT}`);
    })
})