import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyToken } from "../middlewares/user.middlewares.js";
import { 
    deleteFile,
    getFiles,
    renameFile,
    uploadFile 
} from "../controllers/file.controllers.js";

const router = Router();


// UPLOAD FILE
router.post("/file/upload", verifyToken, upload.single("file"), uploadFile);

// GET FILES
router.get("/file/get", verifyToken, getFiles);

// RENAME FILE
router.put("/file/rename", verifyToken, upload.none(), renameFile);

// DELETE FILE
router.delete("/file/delete", verifyToken, upload.none(), deleteFile);


export default router;