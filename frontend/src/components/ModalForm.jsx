import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalForm({ type, data, close }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  // =========================
  // ✅ PREFILL (EDIT MODE)
  // =========================
  useEffect(() => {
    if (data) {
      if (type === "hospital") {
        setForm({
          name: data.hospital_name || data.name || "",
          email: data.email || "",
          password: "",
          phone: data.phone || "",
          address: data.address || ""
        });
      }

      if (type === "donor") {
        setForm({
          name: data.full_name || data.name || "",
          email: data.email || "",
          password: "",
          phone: data.phone || "",
          address: ""
        });
      }
    } else {
      // reset when adding new
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
      });
    }
  }, [data, type]);

  // =========================
  // ✅ INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // ✅ SUBMIT (ADD + EDIT)
  // =========================
  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // 🔥 FIX: prevent refresh

    try {
      // =========================
      // 🏥 HOSPITAL
      // =========================
      if (type === "hospital") {
        if (data) {
          // ✅ UPDATE
          await axios.put(
            `http://127.0.0.1:5000/api/hospitals/${data.id}`,
            {
              hospital_name: form.name,
              email: form.email,
              phone: form.phone,
              address: form.address
            }
          );
        } else {
          // ✅ CREATE
          await axios.post(
            "http://127.0.0.1:5000/api/register-hospital",
            {
              hospitalName: form.name,
              email: form.email,
              password: form.password,
              phone: form.phone,
              address: form.address
            }
          );
        }
      }

      // =========================
      // 🧑 DONOR
      // =========================
      if (type === "donor") {
        if (data) {
          // ✅ UPDATE
          await axios.put(
            `http://127.0.0.1:5000/api/donors/${data.id}`,
            {
              full_name: form.name,
              email: form.email,
              phone: form.phone
            }
          );
        } else {
          // ✅ CREATE
          await axios.post(
            "http://127.0.0.1:5000/api/register",
            {
              fullName: form.name,
              email: form.email,
              password: form.password,
              phone: form.phone
            }
          );
        }
      }

      alert(data ? "✅ Updated successfully" : "✅ Added successfully");

      close(); // close modal + refresh table
    } catch (err) {
      console.error(err);
      alert("❌ Error saving data");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>
          {data ? "Edit" : "Add"} {type}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* ===== HOSPITAL FORM ===== */}
          {type === "hospital" && (
            <>
              <div style={styles.formGroup}>
                <label>Hospital Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label>Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              {!data && (
                <div style={styles.formGroup}>
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
              )}

              <div style={styles.formGroup}>
                <label>Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </>
          )}

          {/* ===== DONOR FORM ===== */}
          {type === "donor" && (
            <>
              <div style={styles.formGroup}>
                <label>Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label>Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              {!data && (
                <div style={styles.formGroup}>
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
              )}

              <div style={styles.formGroup}>
                <label>Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </>
          )}

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.primaryBtn}>
              {data ? "Update" : "Submit"}
            </button>

            <button type="button" style={styles.secondaryBtn} onClick={close}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 🎨 UI
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    textTransform: "capitalize",
  },
  formGroup: {
    marginBottom: "12px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  buttonGroup: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
  },
  primaryBtn: {
    padding: "10px 15px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "10px 15px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};