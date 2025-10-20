export function Landing({ navigate }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Veridia Hiring App</h1>
      <p>Please choose an option below:</p>
      <button onClick={() => navigate("/register")} style={{ margin: "10px", padding: "10px 20px" }}>
        Register
      </button>
      <button onClick={() => navigate("/login")} style={{ margin: "10px", padding: "10px 20px" }}>
        Login
      </button>
    </div>
  );
}
