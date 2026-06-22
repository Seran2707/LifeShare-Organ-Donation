import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HospitalTable from "../components/HospitalTable";
import DonorTable from "../components/DonorTable";
import StatsCards from "../components/StatsCards";
import Chatbot from "../components/Chatbot";

export default function AdminDashboard() {
  const [active, setActive] = useState("hospital");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { key: "hospital", label: "Hospital", icon: "🏥" },
    { key: "donor", label: "Donor", icon: "🧍" },
    { key: "stats", label: "Stats", icon: "📊" },
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

  return (
    <div style={styles.wrapper}>

      {/* ☰ HAMBURGER */}
      <div
        className="hamburger"
        style={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* SIDEBAR */}
      <Sidebar
        menuItems={menuItems}
        active={active}
        setActive={setActive}
        title="Admin Panel"
        isOpen={menuOpen}
      />

      {/* MAIN CONTENT */}
      <div
        style={{
          ...styles.content,
          marginLeft: menuOpen ? "220px" : "0px",
        }}
      >
        {active === "hospital" && <HospitalTable />}
        {active === "donor" && <DonorTable />}
        {active === "stats" && <StatsCards />}
      </div>

      {/* 🤖 CHATBOT (FLOATING - DOES NOT AFFECT LAYOUT) */}
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
};