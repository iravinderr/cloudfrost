import jwt from "jsonwebtoken";
import { OTP } from "../models/otp.models.js";
import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { SuccessResponse, ErrorResponse } from "../utils/responses.utils.js";


// ================================================== REGISTRATION CONTROLLERS ==================================================

export const register = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return ErrorResponse(res, 400, "Fill all the required fields");
    }

    const user = await USER.findOne({ email });
    if (user) {
        return ErrorResponse(res, 400, "Account already exists");
    }

    await OTP.create({ email });

    return SuccessResponse(res, `A verification otp has been sent to your email`);
});

export const confirmRegistration = asyncHandler(async (req, res) => {
    const { fullName, email, password, otp } = req.body;

    const recentOTP = await OTP.findOne({ email }).sort({ createdAt : -1 }).limit(1);

    if (!recentOTP) {
        return ErrorResponse(res, 400, "OTP expired. Try again.");
    } else if (otp !== recentOTP.otp) {
        return ErrorResponse(res, 400, "Entered otp is wrong"); 
    }

    await USER.create({ fullName, email, password, verified: true});

    return SuccessResponse(res, `You have been registered successfully`);
});


// ================================================== LOGIN/LOGOUT CONTROLLERS ==================================================

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return ErrorResponse(res, 400, "Fill all the required fields");
    }

    const user = await USER.findOne({ email });
    if (!user) {
        return ErrorResponse(res, 404, "Account does not exists");
    }

    const correctPassword = await user.validatePassword(password);
    if (!correctPassword) {
        return ErrorResponse(res, 401, "Password is incorrect");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
        success: true,
        message: "Logged in",
        accessToken,
        refreshToken
    });
});

export const logout = asyncHandler(async (req, res) => {
    await USER.findByIdAndUpdate(req.user?._id, {refreshToken: ""});

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
        success: true,
        message: "Logged out"
    });
});


// ================================================== TOKEN CONTROLLERS ==================================================

export const refreshTokens = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        return ErrorResponse(res, 401, "Unauthorised request");
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    const user = await USER.findById(decodedToken?._id);
    if (!user) {
        return ErrorResponse(res, 400, "Session expired. Login again.");
    }

    if (incomingRefreshToken !== user.refreshToken) {
        return ErrorResponse(res, 401, "Refresh access token is expired. Login again");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    const options = {
        httpOnly : true,
        secure : true
    };

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
        succes: true,
        message: "Logged in",
        user,
        accessToken,
        refreshToken
    });
});


// ================================================== CHANGE/RESET PASSWORD CONTROLLERS ==================================================

export const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return ErrorResponse(res, 400, "Password does not match");
    }

    const user = await USER.findById(req.user?._id);

    const passwordCorrect = await user.validatePassword(oldPassword);
    if (!passwordCorrect) {
        return ErrorResponse(res, 400, "Old password is incorrect");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return SuccessResponse(res, "Password changed successfully");
});

export const sendResetPasswordOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return ErrorResponse(res, 400, "Enter the email");
    }

    const user = await USER.findOne({ email });
    if (!user) {
        return ErrorResponse(res, 404, "Account doesn't exists");
    }

    await OTP.create({ email });

    return SuccessResponse(res, `A verification otp has been sent to your email`);
});

export const validateResetPasswordOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const recentOTP = await OTP.findOne({ email }).sort({ createdAt : -1 }).limit(1);

    if (!recentOTP) {
        return ErrorResponse(res, 400, "OTP expired. Try again.");
    } else if (otp !== recentOTP.otp) {
        return ErrorResponse(res, 400, "Entered otp is wrong"); 
    }

    return SuccessResponse(res, "Success");
});

export const resetPassword = asyncHandler(async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return ErrorResponse(res, 400, "Password does not match");
    }

    const user = await USER.findOne({ email });

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return SuccessResponse(res, "Password reset successfully");
});


// ================================================== PROFILE CONTROLLERS ==================================================

export const getProfile = asyncHandler(async (req, res) => {
    return SuccessResponse(res, "", req.user);
});

export const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { fullName, phone, gender, DOB } = req.body;

    const user = await USER.findByIdAndUpdate(userId, { fullName, phone, gender, DOB }, { new: true }).select("-password -refreshToken");

    return SuccessResponse(res, "", user);
});