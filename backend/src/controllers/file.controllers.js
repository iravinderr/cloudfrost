import { FILE } from "../models/file.models.js";
import { USER } from "../models/user.models.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.utils.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/responses.utils.js";
import fs from "fs";


export const uploadFile = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    let { parentFolderId } = req.body;
    if (parentFolderId === undefined) {
        parentFolderId === null;
    }

    const file = req.file;
    if (!file) {
        return ErrorResponse(res, 400, "Select a file");
    }

    const fileType = file.mimetype.split("/")[0];
    if (fileType !== "image") {
        return ErrorResponse(res, 400, "Currenty this application supports image files only");
    }
    
    const fileName = file.originalname.split(".")[0];
    const fileRes = await FILE.findOne({ name: fileName, fileType, parentFolderId, userId });
    if (fileRes) {
        fs.unlinkSync(file.path);
        return ErrorResponse(res, 400, "File already exists with the name");
    }
    
    const user = await USER.findById(userId);
    if (file.size > user.availableStorage) {
        fs.unlinkSync(file.path);
        return ErrorResponse(res, 400, "File size exceeds the available storage limit");
    }

    const uploadRes = await uploadToCloudinary(file.path);

    await FILE.create({ name: fileName, url: uploadRes.secure_url, publicId: uploadRes.public_id, size: file.size, fileType, parentFolderId, userId });
    user.availableStorage -= file.size;
    await user.save({ validateBeforeSave: false });

    return SuccessResponse(res, "File uploaded");
});

export const getFiles = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const parentFolderId = req.query.parentFolderId;

    const files = await FILE.find({ parentFolderId, userId }).select("-publicId -parentFolderId -userId -__v");

    return SuccessResponse(res, "", files);
});

export const renameFile = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { name, fileId, parentFolderId } = req.body;

    const file = await FILE.findOne({ name, parentFolderId, userId });
    if (file._id === fileId) {
        return SuccessResponse(res, "");
    } else if (file._id !== fileId) {
        return ErrorResponse(res, 400, "File already exists with the entered name");
    }

    await FILE.findByIdAndUpdate(fileId, { name });

    return SuccessResponse(res, "File is renamed");
});

export const deleteFile = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const fileId = req.query.fileId;

    const file = await FILE.findById(fileId);
    if (!file) {
        return ErrorResponse(res, 404, "File does not exists");
    }

    await deleteFromCloudinary(file.publicId);
    await USER.findByIdAndUpdate(userId, { $inc: { availableStorage: file.size } });
    await FILE.findByIdAndDelete(fileId);

    return SuccessResponse(res, "File deleted");
});