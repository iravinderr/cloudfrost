import { Router } from "express";
import { verifyToken } from "../middlewares/user.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";



const router = Router();


router.post("/file/create", verifyToken, upload.none(), )