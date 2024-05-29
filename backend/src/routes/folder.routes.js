import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyToken } from "../middlewares/user.middlewares.js";
import { 
    createFolder, 
    showFolder
} from "../controllers/folder.controllers.js";



const router = Router();



// CREATE FOLDER
router.post("/folder/create", verifyToken, upload.none(), createFolder);

// SHOW FOLDERS
router.get("/folder/show", verifyToken, showFolder);





export default router;