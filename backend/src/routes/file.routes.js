import { Router } from "express";
import { verifyToken } from "../middlewares/user.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { 
    uploadFile 
} from "../controllers/file.controllers.js";

const router = Router();


// UPLOAD FILE ROUTE
router.post("/file/upload", verifyToken, upload.single("file"), uploadFile);


export default router;