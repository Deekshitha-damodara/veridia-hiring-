import React from "react";

export function Dashboard({ navigate }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.email === "admin@veridia.com") {
    navigate("/login"); // only normal users
    return null;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Age: {user.age || "N/A"}</p>
      <button onClick={() => navigate("/application")}>Submit Application</button>
      <button style={{ marginLeft: "20px" }} onClick={() => {
        localStorage.removeItem("user");
        navigate("/login");
      }}>Logout</button>
    </div>
  );
}
