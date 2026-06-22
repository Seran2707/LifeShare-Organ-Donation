import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DonationInfo() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    blood_group: "",
    organ: "",
    availability: "Available"
  });

  const [donorId, setDonorId] = useState(null);

  // ================= CHECK LOGIN =================
  useEffect(() => {
    const storedId = localStorage.getItem("donor_id");

    if (!storedId) {
      alert("Please login first");
      navigate("/login");
    } else {
      setDonorId(Number(storedId)); // ✅ FIX: convert to number
    }
  }, [navigate]);

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!donorId) {
      alert("Donor ID missing. Please login again.");
      return;
    }

    try {
      const payload = {
        donor_id: Number(donorId), // ✅ FIXED
        blood_group: form.blood_group,
        organ: form.organ,
        availability: form.availability
      };

      console.log("🚀 Sending payload:", payload);

      await axios.post(
        "http://127.0.0.1:5000/api/donation-info",
        payload
      );

      alert("Donation info saved ✅");

      setForm({
        blood_group: "",
        organ: "",
        availability: "Available"
      });

    } catch (err) {
      console.log(err);
      alert("Error saving donation info ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Donor Information</h2>

        {/* BLOOD GROUP */}
        <div style={styles.formGroup}>
          <label>Blood Group</label>
          <input
            name="blood_group"
            value={form.blood_group}
            onChange={handleChange}
            placeholder="Enter blood group"
            style={styles.input}
          />
        </div>

        {/* ORGAN */}
        <div style={styles.formGroup}>
          <label>Organ</label>
          <input
            name="organ"
            value={form.organ}
            onChange={handleChange}
            placeholder="Enter organ (Kidney, Liver...)"
            style={styles.input}
          />
        </div>

        {/* AVAILABILITY */}
        <div style={styles.formGroup}>
          <label>Availability</label>
          <input
            name="availability"
            value={form.availability}
            onChange={handleChange}
            placeholder="Available / Not Available"
            style={styles.input}
          />
        </div>

        <button style={styles.button} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

// 🎨 UI STYLES
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f9",
    fontFamily: "Segoe UI",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};