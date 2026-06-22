import { useState, useEffect } from "react";
import axios from "axios";
import ModalForm from "./ModalForm";
import "./TableLayout.css";

const DonorTable = () => {
  const [donors, setDonors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchDonors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/donors");
      setDonors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donor?")) return;

    try {
      await axios.delete(`http://127.0.0.1:5000/api/donors/${id}`);
      fetchDonors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="table-wrapper">
      {/* SAME HEADER DESIGN */}
      <div className="table-header">
        <h2>🩸 Donor Data</h2>

        <button
          className="add-btn"
          onClick={() => {
            setSelected(null);
            setShowModal(true);
          }}
        >
          + Add Donor
        </button>
      </div>

      {/* SAME CARD DESIGN */}
      <div className="table-card">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {donors.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  🚫 No donors found
                </td>
              </tr>
            ) : (
              donors.map((d) => (
                <tr key={d.id}>
                  <td>{d.full_name}</td>
                  <td>{d.email}</td>
                  <td>{d.phone}</td>

                  {/* SAME ACTION STYLE */}
                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setSelected(d);
                        setShowModal(true);
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(d.id)}
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

      {showModal && (
        <ModalForm
          type="donor"
          data={selected}
          close={() => {
            setShowModal(false);
            fetchDonors();
          }}
        />
      )}
    </div>
  );
};

export default DonorTable;