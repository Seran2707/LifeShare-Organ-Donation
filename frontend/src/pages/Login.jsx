import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [type, setType] = useState("donor");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      // =========================
      // DONOR LOGIN
      // =========================
      if (type === "donor") {
        res = await axios.post("http://localhost:5000/api/login", {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token);

        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        const donorId = user?.id || user?.user_id;

        if (donorId) {
          localStorage.setItem("donor_id", donorId);
        }

        alert("Patient Login Successful");
        navigate("/donor-dashboard");
      }

      // =========================
      // HOSPITAL LOGIN
      // =========================
      else if (type === "hospital") {
        res = await axios.post("http://localhost:5000/api/login-hospital", {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("hospital", JSON.stringify(res.data.hospital));
        localStorage.setItem("hospital_id", res.data.hospital.id);

        alert("Hospital Login Successful");
        navigate("/hospital-dashboard");
      }

      // =========================
      // ADMIN LOGIN
      // =========================
      else if (type === "admin") {
        if (form.username === "admin" && form.password === "admin123") {
          alert("Admin Login Successful");
          navigate("/admin");
        } else {
          alert("Invalid Admin Credentials");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        {/* TOGGLE */}
        <div style={styles.toggle}>
          <div
            style={{
              ...styles.tab,
              border: type === "donor" ? "2px solid red" : "1px solid #ccc",
            }}
            onClick={() => setType("donor")}
          >
            Donor
          </div>

          <div
            style={{
              ...styles.tab,
              border: type === "hospital" ? "2px solid red" : "1px solid #ccc",
            }}
            onClick={() => setType("hospital")}
          >
            Hospital
          </div>

          <div
            style={{
              ...styles.tab,
              border: type === "admin" ? "2px solid red" : "1px solid #ccc",
            }}
            onClick={() => setType("admin")}
          >
            Admin
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {(type === "donor" || type === "hospital") && (
            <>
              <input
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
                style={styles.input}
              />
            </>
          )}

          {type === "admin" && (
            <>
              <input
                name="username"
                placeholder="Admin Username"
                required
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
                style={styles.input}
              />
            </>
          )}

          <button type="submit" style={styles.button}>
            {type === "admin"
              ? "Login as Admin"
              : type === "hospital"
              ? "Login as Hospital"
              : "Login as Patient"}
          </button>

          {/* ✅ SIGNUP LINK */}
          <p style={styles.signupText}>
            Don’t have an account?{" "}
            <Link to="/register" style={styles.signupLink}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f9f9f9",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  toggle: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  tab: {
    flex: 1,
    padding: "10px",
    textAlign: "center",
    borderRadius: "8px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    background: "red",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  signupText: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
  },
  signupLink: {
    color: "#2196f3",
    textDecoration: "none",
    fontWeight: "500",
  },
};