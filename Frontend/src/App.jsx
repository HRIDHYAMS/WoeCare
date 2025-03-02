import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Homepage component
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Fixed case sensitivity issue
import Chatbot from "./pages/Chatbot"; // Added chatbot route
import AdminDashboard from "./pages/AdminDashboard"; // Import Admin Dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} /> {/* Redirect after login */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatbot" element={<Chatbot />} /> {/* Chatbot page */}
        <Route path="/admindashboard" element={<AdminDashboard />} /> {/* Admin Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
