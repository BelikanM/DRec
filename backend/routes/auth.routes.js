// /backend/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Config Mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

// Générer OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 🔐 INSCRIPTION
router.post("/register", async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ message: "Email déjà utilisé." });

  const hashed = await bcrypt.hash(password, 10);
  const otpCode = generateOTP();

  const user = new User({ fullName, email, password: hashed, role, otpCode, otpExpires: Date.now() + 10 * 60000 });
  await user.save();

  // Envoi OTP
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Code de vérification",
    text: `Votre code est : ${otpCode}`,
  });

  res.status(201).json({ message: "Inscription réussie. Vérifiez votre email." });
});

// ✅ Vérification OTP
router.post("/verify", async (req, res) => {
  const { email, otpCode } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.otpCode !== otpCode || user.otpExpires < Date.now())
    return res.status(400).json({ message: "Code invalide ou expiré." });

  user.isVerified = true;
  user.otpCode = null;
  user.otpExpires = null;
  await user.save();

  res.json({ message: "Vérification réussie." });
});

// 🔐 Connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Email introuvable." });
  if (!user.isVerified) return res.status(401).json({ message: "Email non vérifié." });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Mot de passe incorrect." });

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { fullName: user.fullName, role: user.role } });
});

module.exports = router;
