import jwt from "jsonwebtoken";
import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse } from "../utils/responses.utils.js";


export const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body?.accessToken;
    if (!token) {
        return ErrorResponse(res, 401, "Unauthorized request");
    }
    
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await USER.findById(decodedToken._id).select("-password -refreshToken -totalStorage -availableStorage -__v");
        req.user = user;
    } catch (error) {
        return ErrorResponse(res, 401, "Session expired. Login again.");
    }
    
    next();
});