import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyToken } from "../middlewares/user.middlewares.js";
import { 
    changePassword,
    confirmRegistration,
    deleteAccount,
    getProfile,
    getStorageInfo,
    login,
    logout,
    refreshTokens,
    register, 
    resetPassword, 
    sendResetPasswordOTP,
    updateProfile,
    validateResetPasswordOTP
} from "../controllers/user.controllers.js";

const router = Router();


// ================================================== REGISTRATION ROUTES ==================================================

// SEND ACCOUNT REGISTRATION OTP
router.post("/register", upload.none(), register);

// CONFIRM THE ACCOUNT REGISTRATION
router.post("/confirm-registration", upload.none(), confirmRegistration);


// ================================================== LOGIN/LOGOUT ROUTES ==================================================

// ACCOUNT LOGIN
router.post("/login", upload.none(), login);

// ACCOUNT LOGOUT
router.post("/logout", verifyToken, upload.none(), logout);


// ================================================== WEB TOKEN ROUTES ==================================================

// VERIFY THE TOKEN
router.post("/verify-token", verifyToken, (req, res) => {return res.status(200).json({success: true})});

// REFRESH THE WEB/LOGIN TOKENS
router.post("/refresh-tokens", upload.none(), refreshTokens);


// ================================================== CHANGE/RESET PASSWORD ROUTES ==================================================

// CHANGE ACCOUNT LOGIN PASSWORD
router.post("/change-password", verifyToken, upload.none(), changePassword);

// SEND RESET PASSWORD OTP
router.post("/send-reset-password-otp", upload.none(), sendResetPasswordOTP);

// VALIDATE RESET PASSWORD OTP
router.post("/validate-reset-password-otp", upload.none(), validateResetPasswordOTP);

// RESET ACCOUNT PASSWORD
router.post("/reset-password", upload.none(), resetPassword);

// DELETE ACCOUNT
router.delete("/delete-account", verifyToken, deleteAccount);


// GET PROFILE DETAILS
router.get("/get-profile", verifyToken, getProfile);

// UPDATE PROFILE DETAILS
router.put("/update-profile", verifyToken, upload.none(), updateProfile);

// GET STORAGE INFO
router.get("/get-storage-info", verifyToken, getStorageInfo);


export default router;