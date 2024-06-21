import jwt from "jsonwebtoken";
import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse } from "../utils/responses.utils.js";


export const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body?.accessToken;
    console.log("token -> ", token);
    if (!token) {
        return ErrorResponse(res, 401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await USER.findById(decodedToken?._id).select("-password -refreshToken -__v");
    if (!user) {
        return ErrorResponse(res, 401, "Session expired. Login again.");
    }

    req.user = user;
    next();
});