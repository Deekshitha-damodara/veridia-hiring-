import React, { useState } from "react";
import "../App.css";

export function ApplicationForm({ navigate }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    collegeName: "",
    proficiency: "", // free-text for languages
    skills: "", // required
    experience: "",
    projects: "",
    resumeFile: null,
    websiteLink: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("❌ Please login first");
      navigate("/login");
      return;
    }

    // Validate required fields
    if (!form.skills.trim()) {
      alert("❌ Skills section is required");
      return;
    }
    if (!form.proficiency.trim()) {
      alert("❌ Languages section is required");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      // Use email in URL as backend expects
      const res = await fetch(`http://localhost:5000/users/${user.email}/application`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        alert("✅ Application submitted successfully");
        navigate("/dashboard");
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="application-form-container">
      <h1 className="form-title">Application Form</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="application-form">
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="education"
          placeholder="Education (Degree e.g., B.Tech, MCA)"
          value={form.education}
          onChange={handleChange}
          required
        />
        <input
          name="collegeName"
          placeholder="College / University Name"
          value={form.collegeName}
          onChange={handleChange}
          required
        />

        <input
          name="proficiency"
          placeholder="Languages you are proficient in (e.g., Telugu, English, Hindi)"
          value={form.proficiency}
          onChange={handleChange}
          required
        />

        <input
          name="skills"
          placeholder="Skills (e.g., HTML, CSS, JavaScript)"
          value={form.skills}
          onChange={handleChange}
          required
        />

        <input
          name="experience"
          placeholder="Experience (in years)"
          value={form.experience}
          onChange={handleChange}
        />
        <input
          name="projects"
          placeholder="Projects (comma separated)"
          value={form.projects}
          onChange={handleChange}
        />

        <label className="label-bold">Upload Resume (PDF / JPG / DOCX)</label>
        <input
          name="resumeFile"
          type="file"
          onChange={handleChange}
          accept=".pdf,.doc,.docx,.jpg,.jpeg"
          required
        />

        <input
          name="websiteLink"
          placeholder="Website link (LinkedIn / GitHub / Portfolio)"
          value={form.websiteLink}
          onChange={handleChange}
        />

        <button type="submit" className="submit-button">
          Submit Application
        </button>
      </form>
    </div>
  );
}
