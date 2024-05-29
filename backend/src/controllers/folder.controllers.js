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



const showFolder = asyncHandler(async (req, res) => {
    const parentFolderId = req.query.parentFolderId;

    const foldersArray = await FOLDER.find({ parentFolderId, userId: req.user?._id });

    const folders = [];
    foldersArray.forEach((folder) => {
        folders.push({
            name: folder.name,
            folderId: folder._id
        });
    });

    return SuccessResponse(res, "", folders);
});



export {
    createFolder,
    showFolder,
}