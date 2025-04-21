import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: process.env.SMPT_USER, // Your Gmail email
            pass: process.env.SMPT_PASS, // Your Gmail app password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
} catch (error) {
    console.error("Error sending email:", error);
    throw error;
}
};

