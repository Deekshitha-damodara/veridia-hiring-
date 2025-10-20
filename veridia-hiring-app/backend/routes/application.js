const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Application = require("../models/Application");
const nodemailer = require("nodemailer");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// ✅ Middleware to verify user token
function auth(req, res, next) {
  const token = req.header("x-auth-token") || req.header("authorization");
  if (!token) return res.status(401).json({ msg: "No token provided" });
  try {
    const t = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(t, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Invalid token" });
  }
}

// ✅ Middleware for admin routes
function adminOnly(req, res, next) {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Admins only" });
  next();
}

// ✅ Email setup
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ✅ POST - Create new job application
router.post("/", auth, async (req, res) => {
  try {
    const { fullName, email, phone, education, proficiency, skills, resumeLink, website, portfolio } = req.body;

    const skillsArr = Array.isArray(skills)
      ? skills
      : skills
      ? skills.split(",").map((s) => s.trim())
      : [];

    const app = new Application({
      user: req.user.id,
      fullName,
      email,
      phone,
      education,
      proficiency,
      skills: skillsArr,
      resumeLink,
      website,
      portfolio,
    });

    await app.save();
    res.json({ msg: "Application submitted successfully", app });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }
});

// ✅ GET - User’s own applications
router.get("/mine", auth, async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user.id });
    res.json(apps);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }
});

// ✅ GET - Admin: All applications
router.get("/", auth, adminOnly, async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }
});

// ✅ PUT - Admin: Update status and send email
router.put("/:id/status", auth, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });

    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: app.email,
      subject: 'Application status updated: ${status}',
      text: 'Hello ${app.fullName},\n\nYour application status is now: ${status}.\n\nRegards,\nVeridia HR',
    });

    res.json(app);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }
});

module.exports = router;