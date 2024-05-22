import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// INITIALISING THE APP
const app = express();


// CORS MIDDLEWARE
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// JSON PARSING MIDDLEWARE
app.use(express.json({limit: "16kb"}));

// URL PARSING MIDDLWARE
app.use(express.urlencoded({extended: true, limit: "16kb"}));

// STATIC MIDDLWARE FOR LOCAL FILE STORAGE
app.use(express.static("public"));

// COOKIE PARSING MIDDLWARE
app.use(cookieParser());


// USER MIDDLEWARES
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user", userRoutes);


export default app;