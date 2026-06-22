import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [type, setType] = useState("donor");
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.placeholder]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ================= DONOR =================
      if (type === "donor") {
        if (form["Password"] !== form["Confirm Password"]) {
          alert("Passwords do not match");
          return;
        }

        const res = await axios.post(
  "http://localhost:5000/api/register",
  {
    fullName: form["Full Name"],
    email: form["Email"],
    password: form["Password"],
    phone: form["Phone Number"], // ✅
  }
);

        localStorage.setItem(
  "donor_id",
  res.data.donor_id
);

alert(res.data.message);
navigate("/donor-dashboard");
      }

      // ================= HOSPITAL =================
      else {
        if (form["Password"] !== form["Confirm Password"]) {
          alert("Passwords do not match");
          return;
        }

        const res = await axios.post(
          "http://localhost:5000/api/register-hospital",
          {
            hospitalName: form["Hospital Name"],
            contactPerson: form["Contact Person"],
            licenseNumber: form["License Number"],
            phone: form["Phone Number"],
            address: form["Address"],
            email: form["Email"],
            password: form["Password"],
          }
        );

        alert(res.data.message);
        navigate("/hospital-dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account</h2>

        {/* Toggle */}
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
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {type === "donor" ? (
            <>
              <input placeholder="Full Name" onChange={handleChange} required style={styles.input} />
              <input placeholder="Email" onChange={handleChange} required style={styles.input} />
              <input
  placeholder="Phone Number"
  onChange={handleChange}
  required
  style={styles.input}
/>
              <input type="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
              <input type="password" placeholder="Confirm Password" onChange={handleChange} required style={styles.input} />
            </>
          ) : (
            <>
              <input placeholder="Hospital Name" onChange={handleChange} required style={styles.input} />
              <input placeholder="Contact Person" onChange={handleChange} required style={styles.input} />
              <input placeholder="License Number" onChange={handleChange} required style={styles.input} />
              <input placeholder="Phone Number" onChange={handleChange} required style={styles.input} />
              <textarea placeholder="Address" onChange={handleChange} required style={styles.textarea} />
              <input placeholder="Email" onChange={handleChange} required style={styles.input} />
              <input type="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
              <input type="password" placeholder="Confirm Password" onChange={handleChange} required style={styles.input} />
            </>
          )}

          <button type="submit" style={styles.button}>
            {type === "donor"
              ? "Create Patient Account"
              : "Create Hospital Account"}
          </button>

          {/* Login Link */}
          <p style={styles.loginText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.loginLink}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// 🎨 Styles
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
    width: "420px",
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
  textarea: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "none",
  },
  button: {
    background: "red",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  loginText: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
  },
  loginLink: {
    color: "#2196f3",
    textDecoration: "none",
    fontWeight: "500",
  },
};