import React, { useState } from "react";
import { Landing } from "./components/Landing";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { ForgotPassword } from "./components/ForgotPassword";
import { Dashboard } from "./components/Dashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { ApplicationForm } from "./components/ApplicationForm";
import { Header } from "./components/Header";
import "./App.css";

export default function App() {
  const [route, setRoute] = useState("/"); // default Landing page

  const navigate = (path) => setRoute(path);

  return (
    <div>
      <Header navigate={navigate} />
      {route === "/" && <Landing navigate={navigate} />}
      {route === "/register" && <Register navigate={navigate} />}
      {route === "/login" && <Login navigate={navigate} />}
      {route === "/forgot-password" && <ForgotPassword navigate={navigate} />}
      {route === "/dashboard" && <Dashboard navigate={navigate} />}
      {route === "/admin" && <AdminDashboard navigate={navigate} />}
      {route === "/application" && <ApplicationForm navigate={navigate} />}
    </div>
  );
}
