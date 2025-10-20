import { registerUser } from "../api";

export function Register({ navigate }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      age: parseInt(e.target.age.value) || null
    };
    try {
      const result = await registerUser(data);
      alert(JSON.stringify(result, null, 2));
      if (result.success) navigate("/login");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required /><br />
        <input name="email" placeholder="Email" type="email" required /><br />
        <input name="password" placeholder="Password" type="password" required /><br />
        <input name="age" placeholder="Age" type="number" /><br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <span onClick={() => navigate("/login")} style={{ color: "blue", cursor: "pointer" }}>Login</span>
      </p>
    </div>
  );
}
