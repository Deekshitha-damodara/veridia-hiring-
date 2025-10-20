const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: String,
    email: String,
    phone: String,
    education: String,
    proficiency: String,
    skills: [String],
    experience: String,
    projects: String,
    resumeLink: String,
    portfolioLink: String,
    websiteLink: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);