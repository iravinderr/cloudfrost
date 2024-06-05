import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "MyCloud",
            use_filename: true
        });

        fs.unlinkSync(localFilePath);
        return uploadResponse;
    } catch (error) {
        console.log("!!! ERROR IN CLOUDINARY FILE UPLOAD !!!");
        console.log(error);
        fs.unlinkSync(localFilePath);
        return null;
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("!!! ERROR IN CLOUDINARY FILE DELETE !!!");
        console.log(error);
    }
}

export { uploadToCloudinary, deleteFromCloudinary };