import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HospitalInfo from "../components/HospitalInfo";
import Chatbot from "../components/Chatbot";
import Sidebar from "../components/Sidebar";
import Requests from "../components/Requests";

export default function HospitalDashboard() {
  const [active, setActive] = useState("volunteers");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [volunteers, setVolunteers] = useState([]);
  const [hospitalName, setHospitalName] = useState("");
  const [organType, setOrganType] = useState("");
  const [phone, setPhone] = useState("");
  const [hospitalEmail, setHospitalEmail] = useState("");

  const menuItems = [
  { key: "volunteers", label: "Donor Volunteers", icon: "🧑" },
  { key: "create", label: "Hospital Request", icon: "🏥" },
  { key: "requests", label: "Request Status", icon: "📩" },
  { key: "info", label: "Hospital Info", icon: "ℹ️" },
  { key: "logout", label: "Logout", icon: "🚪" },
];

  const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (confirmLogout) {
    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
  }
};

if (active === "logout") {
  handleLogout();
}

  // ================= FETCH VOLUNTEERS =================
  const fetchVolunteers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/volunteers");
      setVolunteers(res.data);
    } catch (err) {
      console.log("Error fetching volunteers:", err);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  // ================= CREATE REQUEST =================
  const handleCreateRequest = async () => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:5000/api/request",
      {
        hospital_name: hospitalName,
        hospital_email: hospitalEmail,
        organ: organType,
        phone: phone,
      }
    );

    console.log("SUCCESS:", res.data);

    window.alert(
      "Emergency Request Sent Successfully ✅\n\nAll donors have been notified by email."
    );

    setHospitalName("");
    setOrganType("");
    setPhone("");

  } catch (err) {
    console.error("REQUEST ERROR:", err);

    window.alert(
      err.response?.data?.message || "Error sending request"
    );
  }
};

  return (
    <div style={styles.wrapper}>

      {/* ☰ HAMBURGER */}
      <div
        style={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* SIDEBAR (same system as Admin) */}
      <Sidebar
        menuItems={menuItems}
        active={active}
        setActive={setActive}
        title="Hospital Panel"
        isOpen={menuOpen}
      />

      {/* MAIN CONTENT */}
      <div
        style={{
          ...styles.content,
          marginLeft: menuOpen ? "220px" : "0px",
        }}
      >

        {/* VOLUNTEERS */}
        {active === "volunteers" && (
          <div style={styles.card}>
            <h2>🧑 Volunteer List</h2>

            <table style={styles.table}>
  <thead>
    <tr style={styles.tableHeader}>
      <th style={styles.th}>Donor Name</th>
      <th style={styles.th}>Phone</th>
      <th style={styles.th}>Blood Group</th>
      <th style={styles.th}>Organ</th>
      <th style={styles.th}>Status</th>
    </tr>
  </thead>

  <tbody>
    {volunteers.map((v) => (
      <tr key={v.id}>
        <td style={styles.td}>{v.full_name}</td>
        <td style={styles.td}>{v.phone}</td>
        <td style={styles.td}>{v.blood_group}</td>
        <td style={styles.td}>{v.organ}</td>
        <td style={styles.td}>
          {v.availability === "available"
            ? "✅ Available"
            : "❌ Not Available"}
        </td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        )}

        {/* REQUEST */}
        {active === "create" && (
          <div style={styles.card}>
            <h2>🏥 Hospital Request</h2>

            <div style={styles.formContainer}>
              <input
                style={styles.input}
                placeholder="Hospital Name"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Organ Type"
                value={organType}
                onChange={(e) => setOrganType(e.target.value)}
              />

              <input
              style={styles.input}
              placeholder="Hospital Email"
              value={hospitalEmail}
              onChange={(e) => setHospitalEmail(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button style={styles.submitBtn} onClick={handleCreateRequest}>
                Send Request
              </button>
            </div>
          </div>
        )}

{/* REQUEST STATUS */}
{active === "requests" && (
  <Requests role="hospital" />
)}

{/* INFO */}
{active === "info" && <HospitalInfo />}

      </div>

      {/* 🤖 CHATBOT */}
      <Chatbot />
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f7fb",
    position: "relative",
  },

  hamburger: {
    position: "fixed",
    top: "18px",
    left: "18px",
    fontSize: "24px",
    cursor: "pointer",
    zIndex: 1200,
    background: "#ffffff",
    color: "#111827",
    padding: "10px 14px",
    borderRadius: "14px",
    boxShadow: "0 12px 24px rgba(15,23,42,0.12)",
    border: "1px solid #e5e7eb",
  },

  content: {
    flex: 1,
    padding: "24px",
    width: "100%",
    transition: "0.3s ease",
    minHeight: "100vh",
  },

  card: {
    background: "rgba(255,255,255,0.96)",
    padding: "24px",
    borderRadius: "24px",
    boxShadow: "0 16px 35px rgba(15,23,42,0.08)",
    border: "1px solid #ebeff5",
  },

  table: {
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed",   // ADD THIS
},

  tableHeader: {
    background: "#111827",
    color: "#fff",
  },

  th: {
  padding: "16px",
  textAlign: "left",
  background: "#111827",
  color: "#fff",
  width: "20%",          // ADD THIS
},

  td: {
  padding: "16px",
  borderBottom: "1px solid #eef2f7",
  textAlign: "left",
  width: "20%",          // ADD THIS
},

  noData: {
    textAlign: "center",
    padding: "18px",
    color: "#888",
  },

  formContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "20px",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #d9dee8",
    outline: "none",
    fontSize: "0.96rem",
    background: "#fff",
  },

  submitBtn: {
    border: "none",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#fff",
    padding: "14px 18px",
    borderRadius: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 12px 24px rgba(34, 197, 94, 0.18)",
  },
};

