import mongoose, { Schema } from "mongoose";
import { mailer } from "../utils/mailer.utils.js";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    }
});


otpSchema.pre("save", async function (next) {
    await mailer(
        this.email,
        `Verification otp from MyCloud Services`,
        `This is the verification otp email from MyCloud Services.
        Use ${this.otp} as your verification otp. This otp is valid for the next five minutes.`
    )
    next();
});


export const OTP = mongoose.model("OTP", otpSchema);