import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Homepage component
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Fixed case sensitivity issue
import Chatbot from "./pages/Chatbot"; // Added chatbot route
import AdminDashboard from "./pages/AdminDashboard"; // Import Admin Dashboard
import Quest from "./pages/Quest";
import SlotBooking from "./pages/Slotbooking";
import BookSlot from "./pages/BookSlot";
import  CancelSlot from "./pages/Cancel"; 
import   AddTherapist from "./pages/AddTherapist";     
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
        <Route path="/Quest" element={<Quest />} />
        <Route path="/Slotbooking" element={< SlotBooking/>} />
        <Route path="/Bookslot" element={<BookSlot />} />
        <Route path="/Cancel" element={< CancelSlot />} />
        <Route path="/therapist" element={< AddTherapist />} />

      </Routes>
    </Router>
  );
}

export default App;
