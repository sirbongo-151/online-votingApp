import OTP from '../models/otpModel.js';
import { sendEmail } from '../utils/sendOtp.js';  


export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email || typeof email !== 'string') {
            return res.status(400).json({ message: "Invalid email format" });
          }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`Generated OTP for ${email}:`, otp);

        // Save OTP to database
        const newOtp = new OTP({ email: email, otp });
        await newOtp.save();

        // Send email
        await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Error sending OTP", error: error.message });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const existingOtp = await OTP.findOne({ email, otp });

        if (!existingOtp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        await OTP.deleteOne({ email }); 
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Error verifying OTP" });
    }
};
