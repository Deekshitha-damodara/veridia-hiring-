// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ----------------------
// MongoDB Connection
// ----------------------
const uri = "mongodb+srv://sonu:sonudeekshu1005@cluster0.roibluy.mongodb.net/veridia-hiring";

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch(err => console.error("❌ DB Error:", err));

// ----------------------
// User Schema & Model
// ----------------------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  applications: { type: Array, default: [] } // store submitted applications
});

const User = mongoose.model("User", userSchema);

// ----------------------
// Routes
// ----------------------

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// ----------------------
// User Registration
// ----------------------
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, error: "User already exists" });

    const newUser = new User({ name, email, password, age });
    await newUser.save();
    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------
// Get all users (for login & admin dashboard)
// ----------------------
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// Forgot Password
// ----------------------
app.post("/users/check-email", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (err) {
    res.json({ exists: false, error: err.message });
  }
});

app.post("/users/update-password", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "Email not found" });

    user.password = password; // NOTE: in production, hash the password!
    await user.save();
    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// ----------------------
// Application Submission
// ----------------------
app.post("/users/:email/application", async (req, res) => {
  const { email } = req.params;
  const application = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    user.applications.push({ ...application, status: "pending" });
    await user.save();
    res.json({ success: true, message: "Application submitted successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// ----------------------
// Admin Routes
// ----------------------

// Get all users with applications
app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update application status
app.post("/admin/:userEmail/application/:index/status", async (req, res) => {
  const { userEmail, index } = req.params;
  const { status } = req.body; // 'shortlisted', 'rejected', 'hired'

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.json({ success: false, message: "User not found" });

    const idx = parseInt(index);
    if (idx < 0 || idx >= user.applications.length)
      return res.json({ success: false, message: "Invalid application index" });

    user.applications[idx].status = status;
    await user.save();
    res.json({ success: true, message: `Application ${status}` });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
