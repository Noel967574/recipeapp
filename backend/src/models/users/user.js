import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      salt: { type: String, required: true },
      iv: { type: String, required: true },
      tag: { type: String, required: true },
      ciphertext: { type: String, required: true },
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 10,
      required: true,
    },
    role: {
      type: String,
      enum: ["regular", "admin"],
      default: "regular",
    },
  },
  { timestamps: true }
);

// ✅ Default export
const User = mongoose.model("User", userSchema);
export default User;
