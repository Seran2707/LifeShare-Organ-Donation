import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateRequest() {
  const [form, setForm] = useState({
    organ_type: "",
    donor_id: ""
  });

  const [donors, setDonors] = useState([]);

  const hospital = JSON.parse(localStorage.getItem("hospital"));

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/donors");
      setDonors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/api/request", {
        hospital_id: hospital.id,
        donor_id: form.donor_id,
        organ_type: form.organ_type
      });

      alert("Request sent successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Error sending request ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New Request</h2>

      <label>Organ Type:</label>
      <input
        type="text"
        name="organ_type"
        onChange={handleChange}
        placeholder="Enter organ"
      />

      <br /><br />

      <label>Select Donor:</label>
      <select name="donor_id" onChange={handleChange}>
        <option value="">-- Select Donor --</option>

        {donors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.full_name} ({d.blood_group})
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={handleSubmit}>Send Request</button>
    </div>
  );
}