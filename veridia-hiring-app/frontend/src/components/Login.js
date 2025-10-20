import { getAllUsers } from "../api";
import { setUser } from "../handling";

export function Login({ navigate }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const adminEmail = "admin@veridia.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      // Store admin in localStorage
      const adminUser = { name: "Admin", email: adminEmail };
      localStorage.setItem("user", JSON.stringify(adminUser));
      navigate("/admin");
    } else {
      try {
        const users = await getAllUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user)); // store normal user too
          navigate("/dashboard");
        } else {
          alert("❌ Invalid email or password");
        }
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" type="email" required /><br />
        <input name="password" placeholder="Password" type="password" required /><br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <span onClick={() => navigate("/register")} style={{ color: "blue", cursor: "pointer" }}>Register</span>
      </p>
      <p>
        Forgot your password? 
        <span onClick={() => navigate("/forgot-password")} style={{ color: "blue", cursor: "pointer" }}>
          Click here
        </span>
      </p>
    </div>
  );
}
