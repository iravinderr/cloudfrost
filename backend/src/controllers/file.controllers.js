import fs from "fs";
import { FILE } from "../models/file.models.js";
import { FOLDER } from "../models/folder.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/responses.utils.js";




const uploadFile = asyncHandler(async (req, res) => {
    const { parentFolderId } = req.body;
    const file = req.file;
    if (!req.file) {
        return ErrorResponse(res, 400, "Select a file");
    }

    const fileName = file.originalname.split(".")[0];
    const fileRes = await FILE.findOne({ name: fileName });
    if (fileRes) {
        return ErrorResponse(res, "File already exists with the name");
    }

    const uploadRes = await uploadToCloudinary(file.path);

    await FILE.create({ name: fileName, url: uploadRes.secure_url, parentFolderId, userId: req.user?._id });

    return SuccessResponse(res, "File uploaded");
});


export {
    uploadFile,
};