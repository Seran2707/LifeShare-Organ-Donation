import { useEffect, useState } from "react";
import axios from "axios";
import "./TableLayout.css";

export default function HospitalInfo() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:5000/api/hospitals");
      setHospitals(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to fetch hospitals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleView = (h) => {
    alert(
      `🏥 ${h.hospital_name}
📧 ${h.email}
📞 ${h.phone || "Not Available"}
🏠 ${h.address || "Not Available"}`
    );
  };

  return (
    <div className="table-wrapper">

      {/* HEADER */}
      <div className="table-header">
        <h2>🏥 Hospital Information</h2>

        <button className="add-btn" onClick={fetchHospitals}>
          🔄 Refresh
        </button>
      </div>

      {/* TABLE */}
      <div className="table-card">
        {loading ? (
          <p className="no-data">Loading...</p>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Hospital Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {hospitals.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-data">
                    🚫 No hospital data found
                  </td>
                </tr>
              ) : (
                hospitals.map((h) => (
                  <tr key={h.id}>
                    <td>{h.hospital_name}</td>
                    <td>{h.email}</td>

                    {/* ✅ PHONE ADDED */}
                    <td>{h.phone || "Not Available"}</td>

                    <td className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleView(h)}
                      >
                        👁 View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}