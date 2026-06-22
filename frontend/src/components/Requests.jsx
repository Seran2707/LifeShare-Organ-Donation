import { useState, useEffect } from "react";
import axios from "axios";

export default function Requests({ role }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://127.0.0.1:5000/api/hospital-requests"
      );

      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (requestId, status) => {
  try {

    const donor = JSON.parse(
      localStorage.getItem("user")
    );
    if (!donor) {
  alert("Please login again");
  return;
}

    await axios.put(
      "http://127.0.0.1:5000/api/request/status",
      {
        request_id: requestId,
        status: status,
        donor_id: donor.id,
        donor_name: donor.full_name || donor.name,
        donor_email: donor.email,
        donor_phone: donor.phone,
      }
    );

    alert("Status updated ✅");

    fetchRequests();

  } catch (err) {
    console.log(err);
    alert("Error updating status ❌");
  }
};
  if (loading) return <p style={styles.loading}>Loading requests...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {role === "hospital" ? "Hospital Requests" : "Hospital Requests"}
      </h2>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
  <th style={styles.th}>Request ID</th>
  <th style={styles.th}>Hospital Name</th>
  <th style={styles.th}>Phone</th>
  <th style={styles.th}>Organ Type</th>
  <th style={styles.th}>Status</th>

  {role === "hospital" && (
    <>
      <th style={styles.th}>Donor Name</th>
      <th style={styles.th}>Donor Phone</th>
      <th style={styles.th}>Donor Email</th>
    </>
  )}

  {role === "donor" && <th style={styles.th}>Actions</th>}
</tr>
        </thead>

        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="6" style={styles.noData}>
                No hospital requests found
              </td>
            </tr>
          ) : (
            requests.map((r, index) => (
              <tr key={r.id} style={index % 2 ? styles.altRow : {}}>
                <td style={styles.td}>{r.id}</td>
                <td style={styles.td}>{r.hospital_name}</td>
                <td style={styles.td}>{r.phone}</td>
                <td style={styles.td}>{r.organ}</td>

                <td style={styles.td}>
  <span style={statusBadge(r.status)}>
    {r.status}
  </span>
</td>

{role === "hospital" && (
  <>
    <td style={styles.td}>
      {r.donor_name || "Waiting"}
    </td>

    <td style={styles.td}>
      {r.donor_phone || "-"}
    </td>

    <td style={styles.td}>
      {r.donor_email || "-"}
    </td>
  </>
)}

{role === "donor" && (
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, background: "#16a34a" }}
                      onClick={() => handleUpdateStatus(r.id, "approved")}
                    >
                      Approve
                    </button>

                    <button
                      style={{ ...styles.button, background: "#dc2626" }}
                      onClick={() => handleUpdateStatus(r.id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ================= STYLES (FIXED MISSING PART) =================
const styles = {
 container: {
  padding: "20px",
  width: "100%",
  overflowX: "auto",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
},
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1e293b",
  },
  table: {
  width: "100%",
  minWidth: "1200px",
  borderCollapse: "collapse",
},
  tableHeader: {
    background: "#1e293b",
    color: "#fff",
  },
  th: {
  padding: "12px",
  border: "1px solid #ddd",
  whiteSpace: "nowrap",
  textAlign: "center",
},
  td: {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "center",
  wordBreak: "break-word",
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
    margin: "0 5px",
    padding: "6px 12px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
    color: "#555",
  },
};

const statusBadge = (status) => {
  const colors = {
    pending: "#f59e0b",
    approved: "#16a34a",
    rejected: "#dc2626",
  };

  return {
    background: colors[status] || "#999",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
  };
};