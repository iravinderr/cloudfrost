import mongoose, { Schema } from "mongoose";

const detailSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Others"]
        },
        DOB : {
            type: Date
        }
    },

    {timestamps: true}
);


export const DETAILS = mongoose.model("DETAILS", detailSchema);