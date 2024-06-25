import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// INITIALISING THE APP
const app = express();

// CORS MIDDLEWARE
app.use(cors({
    origin: [process.env.CORS_ORIGIN_1, process.env.CORS_ORIGIN_2],
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


const api_version1 = `/api/v1/user`;

// USER MIDDLEWARES
import userRoutes from "./routes/user.routes.js";
app.use(`${api_version1}`, userRoutes);

// FOLDER MIDDLEWARES
import folderRoutes from "./routes/folder.routes.js";
app.use(`${api_version1}`, folderRoutes);

// FILE MIDDLEWARES
import fileRoutes from "./routes/file.routes.js";
app.use(`${api_version1}`, fileRoutes);

export default app;