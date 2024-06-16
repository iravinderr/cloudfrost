import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import app from "./app.js";
import connectCD from "./config/cloudinary.config.js";
import connectDB from "./config/database.config.js";

const PORT = process.env.PORT || 8000;

// CLOUDINARY CONNECTION
connectCD();

// DATABASE CONNECTION
await connectDB();

// SERVER ACTIVATION
app.listen(PORT, () => {
    console.log(`SERVER IS LIVE AT PORT ${PORT}`);
});

app.get("/", (req, res) => {
    res.send(<h1>MyCloud</h1>);
})