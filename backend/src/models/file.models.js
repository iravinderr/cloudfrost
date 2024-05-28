import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        folderId: {
            type: Schema.Types.ObjectId,
            ref: "FOLDER",
            default: null
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "USER",
            required: true
        },
    },

    { timestamps: true }
);


export const FILE = mongoose.model("FILE", fileSchema);