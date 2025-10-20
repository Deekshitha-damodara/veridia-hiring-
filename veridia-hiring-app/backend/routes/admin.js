// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Application = require("../models/Application");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// --- Middleware for authentication ---
function auth(req, res, next) {
  const token = req.header("x-auth-token") || req.header("authorization");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const t = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(t, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token invalid" });
  }
}

// --- Middleware for admin-only access ---
function adminOnly(req, res, next) {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Admins only" });
  next();
}

// --- Get all applications ---
router.get("/applications", auth, adminOnly, async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// --- Get all users ---
router.get("/users", auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// --- Delete a user ---
router.delete("/users/:id", auth, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;