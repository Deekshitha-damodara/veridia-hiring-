import React, { useEffect, useState } from "react";

export function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  const admin = JSON.parse(localStorage.getItem("user"));
  if (!admin || admin.email !== "admin@veridia.com") {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Access Denied</h2>;
  }

  const updateStatus = async (userEmail, index, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/admin/${userEmail}/application/${index}/status`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const result = await res.json();
      if (result.success) {
        alert(`✅ Application ${status}`);
        // refresh data
        const updatedUsers = await (await fetch("http://localhost:5000/admin/users")).json();
        setUsers(updatedUsers);
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Admin Dashboard</h1>
      {users.map(user => (
        <div key={user._id} style={{ border: "1px solid gray", padding: "15px", margin: "15px 0" }}>
          <h3>{user.name} ({user.email})</h3>
          <h4>Applications:</h4>
          {user.applications.length === 0 ? (
            <p>No applications submitted yet</p>
          ) : (
            user.applications.map((app, i) => (
              <div key={i} style={{ border: "1px dashed gray", padding: "10px", margin: "10px 0" }}>
                <p><b>Full Name:</b> {app.fullName}</p>
                <p><b>Email:</b> {app.email}</p>
                <p><b>Phone:</b> {app.phone}</p>
                <p><b>Education:</b> {app.education}</p>
                <p><b>College:</b> {app.collegeName}</p>
                <p><b>Languages:</b> {app.proficiency}</p>
                <p><b>Skills:</b> {app.skills}</p>
                <p><b>Experience:</b> {app.experience}</p>
                <p><b>Projects:</b> {app.projects}</p>
                <p><b>Resume:</b> {app.resumeFile ? app.resumeFile.name : "Not uploaded"}</p>
                <p><b>Website:</b> {app.websiteLink}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span className={`status ${app.status}`}>{app.status}</span>
                </p>

                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => updateStatus(user.email, i, "shortlisted")} className="btn btn-success">
                    Accept
                  </button>
                  <button onClick={() => updateStatus(user.email, i, "rejected")} className="btn btn-danger" style={{ marginLeft: "5px" }}>
                    Reject
                  </button>
                  <button onClick={() => updateStatus(user.email, i, "hired")} className="btn btn-primary" style={{ marginLeft: "5px" }}>
                    Hire
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}
