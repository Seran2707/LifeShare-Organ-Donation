import { useState, useEffect } from "react";
import axios from "axios";
import ModalForm from "./ModalForm";
import "./TableLayout.css";

const HospitalTable = () => {
  const [hospitals, setHospitals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  // ================= FETCH =================
  const fetchHospitals = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/hospitals");
      setHospitals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hospital?")) return;

    try {
      await axios.delete(`http://127.0.0.1:5000/api/hospitals/${id}`);
      fetchHospitals();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="table-wrapper">

      {/* HEADER */}
      <div className="table-header">
        <h2>🏥 Hospital Data</h2>

        <button
          className="add-btn"
          onClick={() => {
            setSelected(null);
            setShowModal(true);
          }}
        >
          + Add Hospital
        </button>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Hospital Name</th>
              <th>Email</th>
              <th>Phone</th> {/* ✅ Added */}
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {hospitals.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  🚫 No hospitals found
                </td>
              </tr>
            ) : (
              hospitals.map((h) => (
                <tr key={h.id}>
                  <td>{h.hospital_name}</td>
                  <td>{h.email}</td>
                  <td>{h.phone}</td> {/* ✅ Added */}

                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setSelected(h);
                        setShowModal(true);
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(h.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <ModalForm
          type="hospital"
          data={selected}
          close={() => {
            setShowModal(false);
            fetchHospitals();
          }}
        />
      )}
    </div>
  );
};

export default HospitalTable;