import { FILE } from "../models/file.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/responses.utils.js";




const uploadFile = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
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

    await FILE.create({ name: fileName, url: uploadRes.secure_url, parentFolderId, userId });

    return SuccessResponse(res, "File uploaded");
});

const renameFile = asyncHandler(async (req, res) => {
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

const deleteFile = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { fileId, parentFolderId } = req.body;

    const file = await FILE.findById(fileId);
    if (!file) {
        return ErrorResponse(res, 404, "File does not exists");
    }

    await FILE.findByIdAndDelete(fileId);

    return SuccessResponse(res, "File deleted");
});


export {
    uploadFile,
    deleteFile,
    renameFile
};