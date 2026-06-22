import { useState, useEffect } from "react";
import axios from "axios";

export default function DonorInfo() {
  const [donors, setDonors] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
  });

  // ================= FETCH DONORS =================
  const fetchDonors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/donors");
      setDonors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // ================= START EDIT =================
  const handleEdit = (d) => {
    setEditId(d.id);
    setForm({
      full_name: d.full_name,
      email: d.email,
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/donors/${editId}`,
        form
      );

      // update UI manually
      setDonors((prev) =>
        prev.map((d) =>
          d.id === editId ? { ...d, ...form } : d
        )
      );

      setEditId(null);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= CANCEL =================
  const handleCancel = () => {
    setEditId(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}></h2>

      <table style={styles.table}>
        <thead>
          <tr style={styles.header}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {donors.length === 0 && (
            <tr>
              <td colSpan="3" style={styles.noData}>
                No donors found
              </td>
            </tr>
          )}

          {donors.map((d, index) => (
            <tr key={d.id} style={index % 2 ? styles.altRow : {}}>
              
              {/* NAME */}
              <td style={styles.td}>
                {editId === d.id ? (
                  <input
                    value={form.full_name}
                    onChange={(e) =>
                      setForm({ ...form, full_name: e.target.value })
                    }
                  />
                ) : (
                  d.full_name
                )}
              </td>

              {/* EMAIL */}
              <td style={styles.td}>
                {editId === d.id ? (
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                ) : (
                  d.email
                )}
              </td>

              {/* ACTIONS */}
              <td style={styles.td}>
                {editId === d.id ? (
                  <>
                    <button
                      style={{ ...styles.button, background: "#16a34a" }}
                      onClick={handleUpdate}
                    >
                      Update
                    </button>

                    <button
                      style={{ ...styles.button, background: "#6b7280" }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    style={{ ...styles.button, background: "#3b82f6" }}
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1e293b",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  header: {
    background: "#1e293b",
    color: "#fff",
  },
  th: {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd",
  },
  altRow: {
    background: "#f9fafb",
  },
  noData: {
    textAlign: "center",
    padding: "15px",
    color: "#888",
  },
  button: {
    marginRight: "8px",
    padding: "6px 12px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};