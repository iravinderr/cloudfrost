import mongoose, { Schema } from "mongoose";

const folderSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        parentFolderId: {
            type: Schema.Types.ObjectId,
            ref: "FOLDER",
            default: null
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "USER",
            required: true
        }
    },

    { timestamps: true }
);


export const FOLDER = mongoose.model("FOLDER", folderSchema);