import { useEffect, useState } from "react";
import axios from "axios";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const fetchDonor = async () => {
  try {
    setLoading(true);

    const donorId = localStorage.getItem("donor_id");

    const res = await axios.get(
      `http://localhost:5000/api/donor/${donorId}`
    );

    setDonor(res.data);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDonor();
  }, []);

  // VIEW
  const handleView = (donor) => {
    setSelectedDonor(donor);
    setOpenModal(true);
  };

  // EDIT OPEN
  const handleEdit = (donor) => {
    setSelectedDonor(donor);
    setOpenModal(true);
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/donors/${selectedDonor.id}`,
        selectedDonor
      );

      setOpenModal(false);
      setSelectedDonor(null);
      fetchDonor();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        <h2 className="title">Donor Profile</h2>

        {loading ? (
  <p className="msg">Loading...</p>
) : !donor ? (
  <p className="msg error">No Profile Found</p>
) : (
  <table className="profile-table">
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>{donor.full_name}</td>
        <td>{donor.email}</td>

        <td className="action-cell">

          <button
            className="view-btn"
            onClick={() => handleView(donor)}
          >
            View
          </button>

          <button
            className="edit-btn"
            onClick={() => handleEdit(donor)}
          >
            Edit
          </button>

        </td>
      </tr>
    </tbody>
  </table>
)
        }

        {/* MODAL */}
        {openModal && selectedDonor && (
          <div className="modal-overlay">
            <div className="modal-box">

              <h3>Donor Details</h3>

              <input
                value={selectedDonor.full_name}
                onChange={(e) =>
                  setSelectedDonor({
                    ...selectedDonor,
                    full_name: e.target.value
                  })
                }
                placeholder="Full Name"
              />

              <input
                value={selectedDonor.email}
                onChange={(e) =>
                  setSelectedDonor({
                    ...selectedDonor,
                    email: e.target.value
                  })
                }
                placeholder="Email"
              />

              <input
  value={selectedDonor.phone || ""}
  onChange={(e) =>
    setSelectedDonor({
      ...selectedDonor,
      phone: e.target.value
    })
  }
  placeholder="Phone"
/>

              <div className="modal-actions">

                <button className="save-btn" onClick={handleUpdate}>
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}