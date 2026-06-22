import { useEffect, useState } from "react";
import axios from "axios";
import "./StatsCards.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatsCards = () => {
  const [stats, setStats] = useState({
    donors: 0,
    hospitals: 0,
  });

  const [volunteers, setVolunteers] = useState([]);

  const fetchStats = async () => {
    try {
      const [donorRes, hospitalRes, volunteerRes] = await Promise.all([
        axios.get("http://127.0.0.1:5000/api/donors"),
        axios.get("http://127.0.0.1:5000/api/hospitals"),
        axios.get("http://127.0.0.1:5000/api/volunteers"),
      ]);

      setStats({
        donors: donorRes.data.length,
        hospitals: hospitalRes.data.length,
      });

      setVolunteers(volunteerRes.data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ================= ORGAN COUNT =================
  const organCount = volunteers.reduce((acc, v) => {
    acc[v.organ] = (acc[v.organ] || 0) + 1;
    return acc;
  }, {});

  const organData = Object.keys(organCount).map((key) => ({
    name: key,
    value: organCount[key],
  }));

  // ================= BLOOD GROUP COUNT =================
  const bloodCount = volunteers.reduce((acc, v) => {
    acc[v.blood_group] = (acc[v.blood_group] || 0) + 1;
    return acc;
  }, {});

  const bloodData = Object.keys(bloodCount).map((key) => ({
    name: key,
    value: bloodCount[key],
  }));

  const mainData = [
    { name: "Donors", value: stats.donors },
    { name: "Hospitals", value: stats.hospitals },
  ];

  const COLORS = ["#ff4d4d", "#4da6ff", "#4caf50", "#ff9800"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

      {/* ================= MAIN CHARTS ================= */}
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>

        {/* 📊 Bar Chart */}
        <div style={{ width: "400px", height: "300px" }}>
          <h3>📊 Users Overview</h3>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mainData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🥧 Pie Chart */}
        <div style={{ width: "400px", height: "300px" }}>
          <h3>🥧 Distribution</h3>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mainData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {mainData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= VOLUNTEER CHARTS ================= */}
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>

        {/* 🫀 ORGAN CHART */}
        <div style={{ width: "400px", height: "300px" }}>
          <h3>🫀 Organ Requests</h3>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={organData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {organData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🩸 BLOOD GROUP CHART */}
        <div style={{ width: "400px", height: "300px" }}>
          <h3>🩸 Blood Groups</h3>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bloodData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ff4d4d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default StatsCards;