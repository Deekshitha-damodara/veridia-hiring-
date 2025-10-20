// backend/seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User"); // make sure this file exists

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/veridia_hiring";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected...");

    const adminEmail = "admin@veridia.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("⚠ Admin already exists:", adminEmail);
      mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = new User({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully!");
    console.log("👉 Email:", adminEmail);
    console.log("👉 Password: admin123");

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding admin:", err.message);
    mongoose.disconnect();
  }
}

seedAdmin();