import { FILE } from "../models/file.models.js";
import { FOLDER } from "../models/folder.models.js";
import { asyncHandler } from "../utils/handler.utils.js";
import { ErrorResponse, SuccessResponse } from "../utils/responses.utils.js";


const createFolder = asyncHandler(async (req, res) => {
    const { name, parentFolderId } = req.body;
    const userId = req.user?._id;

    const folder = await FOLDER.findOne({ name, parentFolderId, userId });
    if (folder) {
        return ErrorResponse(res, 400, "Folder already exists with the entered name");
    }

    const newFolder = await FOLDER.create({ name, parentFolderId, userId });

    return SuccessResponse(res, "Folder created", newFolder);
});

const getFolders = asyncHandler(async (req, res) => {
    const parentFolderId = req.query.parentFolderId;
    const userId = req.user?._id;

    const foldersArray = await FOLDER.find({ parentFolderId, userId });

    const folders = [];
    foldersArray.forEach((folder) => {
        folders.push({
            name: folder.name,
            folderId: folder._id
        });
    });

    return SuccessResponse(res, "", folders);
});

const renameFolder = asyncHandler(async (req, res) => {
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

const deleteFolder = asyncHandler(async (req, res) => {
    // const userId = req.user?._id;
    const { folderId } = req.body;

    const deleteFolderContent = async (folderId) => {
        const subFolders = await FOLDER.find({ parentFolderId: folderId });

        for (const subFolder of subFolders) {
            await deleteFolderContent(subFolder._id);
        }

        await FILE.deleteMany({ parentFolderId: folderId });
        await FOLDER.findByIdAndDelete(folderId);
    }

    const folder = await FOLDER.findById(folderId);
    if (!folder) {
        return ErrorResponse(res, 404, "Folder does not exists");
    }

    await deleteFolderContent(folderId);

    return SuccessResponse(res, "Folder deleted");
});


export {
    createFolder,
    getFolders,
    renameFolder,
    deleteFolder,
}