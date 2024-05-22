import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyToken } from "../middlewares/user.middlewares.js";
import { 
    changePassword,
    confirmRegistration,
    login,
    logout,
    refreshTokens,
    register 
} from "../controllers/user.controllers.js";

const router = Router();


router.post("/register", upload.none(), register);

router.post("/confirm-registration", upload.none(), confirmRegistration);

router.post("/login", upload.none(), login);

router.post("/logout", verifyToken, upload.none(), logout);

router.post("/refresh-tokens", upload.none(), refreshTokens);

router.post("/change-password", verifyToken, upload.none(), changePassword);


export default router;