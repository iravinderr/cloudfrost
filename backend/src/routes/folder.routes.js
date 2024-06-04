import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyToken } from "../middlewares/user.middlewares.js";
import { 
    createFolder, 
    deleteFolder, 
    getFolders,
    renameFolder,
} from "../controllers/folder.controllers.js";



const router = Router();



// CREATE FOLDER
router.post("/folder/create", verifyToken, upload.none(), createFolder);

// GET FOLDERS
router.get("/folder/get", verifyToken, getFolders);

// RENAME FOLDER
router.put("/folder/rename", verifyToken, upload.none(), renameFolder);

// DELETE FOLDER
router.delete("/folder/delete", verifyToken, upload.none(), deleteFolder);



export default router;