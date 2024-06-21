import mongoose, { Schema } from "mongoose";
import otpGenerator from "otp-generator";
import { mailer } from "../utils/mailer.utils.js";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 600,
    }
});



otpSchema.pre("save", async function (next) {
    this.otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false
    });
    
    let otpExists = await mongoose.models.OTP.findOne({ otp : this.otp });
    while (otpExists) {
        this.otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false
        });
        
        otpExists = await mongoose.models.OTP.findOne({ otp : this.otp });
    }
    
    const mail_response = await mailer(
        this.email,
        `Verification otp from Cloudfrost Services`,
        `This is the verification otp email from Cloudfrost Services.
        Use ${this.otp} as your verification otp. This otp is valid for the next five minutes.`
    );

    // console.log(mail_response);

    next();
});


export const OTP = mongoose.model("OTP", otpSchema);