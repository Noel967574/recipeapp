import mongoose from "mongoose";

const otpTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },   
    used: { type: Boolean, default: false },
    attempts: { type: Number, default: 0 },
    createdAt: { type: Date, default: () => Date.now() },
});

const OtpToken = mongoose.model("OtpToken", otpTokenSchema);
export default OtpToken;

