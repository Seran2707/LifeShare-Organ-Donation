import { Routes, Route } from "react-router-dom";
import Lifeshare from "./components/Lifeshare";
import Register from "./pages/Register";
//import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"; 
import AdminDashboard from "./pages/AdminDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Lifeshare />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/donor-dashboard" element={<DonorDashboard />} /> 
      <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
    </Routes>
  );
}

export default App;