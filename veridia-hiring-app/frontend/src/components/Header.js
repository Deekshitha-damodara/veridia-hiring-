import React from "react";
import { getUser, clearUser } from "../handling";

export function Header({ navigate }) {
  const user = getUser();

  const logout = () => {
    clearUser();
    navigate("/");
  };

  return (
    <header>
      <h2>Veridia Hiring App</h2>
      <nav>
        {!user && (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
        {user && user.email === "admin@veridia.com" && (
          <>
            <button onClick={() => navigate("/admin")}>Admin Dashboard</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {user && user.email !== "admin@veridia.com" && (
          <>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button onClick={() => navigate("/application")}>Application Form</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}
