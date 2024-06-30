import { FILE } from "../models/file.models.js";
import { FOLDER } from "../models/folder.models.js";
import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/responses.utils.js";


export const createFolder = asyncHandler(async (req, res) => {
    const { name, parentFolderId } = req.body;
    const userId = req.user?._id;

    if (!name) {
        return ErrorResponse(res, 400, "Folder name cannot be empty");
    }

    const folder = await FOLDER.findOne({ name, parentFolderId, userId });
    if (folder) {
        return ErrorResponse(res, 400, "Folder already exists with the entered name");
    }

    const newFolder = await FOLDER.create({ name, parentFolderId, userId });

    return SuccessResponse(res, "Folder created", newFolder);
});

export const getFolders = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const parentFolderId = req.query?.parentFolderId;

    const folders = await FOLDER.find({ parentFolderId, userId }).select("-parentFolderId -userId -__v");

    return SuccessResponse(res, "", folders);
});

export const renameFolder = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { name, folderId, parentFolderId } = req.body;

    const folder = await FOLDER.findOne({ name, parentFolderId, userId });
    if (folder._id === folderId) {
        return SuccessResponse(res, "");
    } else if (folder._id !== folderId) {
        return ErrorResponse(res, 400, "Folder already exists with the entered name");
    }

    await FOLDER.findByIdAndUpdate(folderId, { name });

    return SuccessResponse(res, "Folder is renamed");
});

export const deleteFolder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const folderId = req.query.folderId;

    const deleteFolderContent = async (folderId) => {
        const subFolders = await FOLDER.find({ parentFolderId: folderId });

        for (const subFolder of subFolders) {
            await deleteFolderContent(subFolder._id);
        }

        const files = await FILE.find({ parentFolderId: folderId });
        let totalSize = 0;
        files.forEach((file) => {
            totalSize += file.size;
        })

        await FILE.deleteMany({ parentFolderId: folderId });
        await USER.findByIdAndUpdate(userId, { $inc: { availableStorage: totalSize } });
        await FOLDER.findByIdAndDelete(folderId);
    }

    const folder = await FOLDER.findById(folderId);
    if (!folder) {
        return ErrorResponse(res, 404, "Folder does not exists");
    }

    await deleteFolderContent(folderId);

    return SuccessResponse(res, "Folder deleted");
});