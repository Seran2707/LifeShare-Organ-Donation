import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UpdateProfile from "../components/UpdateProfile";
import DonationInfo from "../components/DonationInfo";
import Requests from "../components/Requests";
import HospitalInfo from "../components/HospitalInfo";
import Chatbot from "../components/Chatbot";

export default function DonorDashboard() {
  const [active, setActive] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { key: "profile", label: "Profile", icon: "👤" },
    { key: "donation", label: "Donation", icon: "🩸" },
    { key: "hospital", label: "Hospitals", icon: "🏥" },
    { key: "requests", label: "Requests", icon: "📩" },
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

const handleMenuChange = (key) => {
  if (key === "logout") {
    handleLogout();
  } else {
    setActive(key);
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

      {/* SIDEBAR (same reusable component as Admin) */}
      <Sidebar
  menuItems={menuItems}
  active={active}
  setActive={handleMenuChange}
  title="Donor Panel"
  isOpen={menuOpen}
/>

      {/* MAIN CONTENT */}
      <div
        style={{
          ...styles.content,
          marginLeft: menuOpen ? "220px" : "0px",
        }}
      >
        {active === "profile" && <UpdateProfile />}
        {active === "donation" && <DonationInfo />}
        {active === "hospital" && <HospitalInfo />}
        {active === "requests" && <Requests role="donor" />}
      </div>

      {/* 🤖 CHATBOT (FLOATING - SAME AS ADMIN) */}
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