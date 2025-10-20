import React, { useState } from "react";

export function ForgotPassword({ navigate }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Step 1: Check if email exists
  const handleCheckEmail = async () => {
    if (!email) return alert("Please enter your email");

    try {
      const res = await fetch("http://localhost:5000/users/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      // Make sure server returned JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error("Server returned non-JSON: " + text);
      }

      const data = await res.json();
      if (data.exists) {
        alert("Email exists! You can now set a new password.");
      } else {
        alert("Email not found. Please check again.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Step 2: Update password
  const handleUpdatePassword = async () => {
    if (!email || !newPassword) return alert("Enter email and new password");

    try {
      const res = await fetch("http://localhost:5000/users/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPassword })
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error("Server returned non-JSON: " + text);
      }

      const data = await res.json();
      alert(data.message);
      if (data.success) navigate("/login");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="container">
      <h1>Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br /><br />
      <button onClick={handleCheckEmail}>Check Email</button><br /><br />
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleUpdatePassword}>Update Password</button><br /><br />
      <span
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => navigate("/login")}
      >
        Back to Login
      </span>
    </div>
  );
}
