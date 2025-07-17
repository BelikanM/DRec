// /backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "juriste", "cabinet"], default: "client" },
  isVerified: { type: Boolean, default: false },
  otpCode: String,
  otpExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
