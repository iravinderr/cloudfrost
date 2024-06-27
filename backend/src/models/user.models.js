import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            required: true,
            default: false
        },
        refreshToken: {
            type: String
        },
        phone: {
            type: String
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Others"]
        },
        DOB: {
            type: Date
        },
        totalStorage: {
            type: Number,
            required: true,
            default: 10000000
        },
        availableStorage: {
            type: Number,
            required: true,
            default: 10000000,
            min: 0,
            max: 10000000,
        }
    },

    { timestamps : true}
);

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            email: this.email,
            verified: this.verified
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

export const USER = mongoose.model("USER", userSchema);