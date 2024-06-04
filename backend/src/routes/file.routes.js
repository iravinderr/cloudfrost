import { Router } from "express";
import { verifyToken } from "../middlewares/user.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { 
    deleteFile,
    renameFile,
    uploadFile 
} from "../controllers/file.controllers.js";

const router = Router();


// UPLOAD FILE ROUTE
router.post("/file/upload", verifyToken, upload.single("file"), uploadFile);

// RENAME FILE
router.put("/file/rename", verifyToken, upload.none(), renameFile);

// DELETE FILE
router.delete("/file/delete", verifyToken, upload.none(), deleteFile);


export default router;