import { FOLDER } from "../models/folder.models";
import { asyncHandler } from "../utils/handler.utils";
import { SuccessResponse } from "../utils/responses.utils";



const createFolder = asyncHandler(async (req, res) => {
    const { name, parentId } = req.body;
    const userId = req.user?._id;

    const newFolder = await FOLDER.create({ name, parentId, userId});

    return SuccessResponse(res, "");
});




export {
    createFolder,
}