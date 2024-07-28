import nodemailer from "nodemailer";
import { APP_NAME } from "../constants.js";

export const mailer = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const mailResponse = await transporter.sendMail({
            from: `${APP_NAME} Services`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        });

        return mailResponse;
    } catch (error) {
        console.log(`MAIL SENDING ERROR`);
        console.log(error);
        return;
    }
}