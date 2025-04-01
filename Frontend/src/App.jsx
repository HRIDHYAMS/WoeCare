import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Homepage component
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Fixed case sensitivity issue
import Chatbot from "./pages/Chatbot"; // Added chatbot route
import AdminDashboard from "./pages/AdminDashboard"; // Import Admin Dashboard
import Qfirst from "./pages/Qfirst";
import Quest from "./pages/Quest";
import Ymht from "./pages/Ymht";
import Anxiety from "./pages/Anxiety";
import Adhd from "./pages/Adhd";
import Bipolar from "./pages/Bipolar";
import Depression from "./pages/Depression";
import Addiction from "./pages/Addiction";
import Ptest from "./pages/Ptest";
import SlotBooking from  "./pages/Slotbooking";
import BookSlot from  "./pages/BookSlot";
import Cancel from  "./pages/Cancel";
import AddTherapist from "./pages/AddTherapist"; 
import ManageSlots from "./pages/ManageSlots"; 
import Score from "./pages/Score"; 

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
        <Route path="/admindashboard" element={<AdminDashboard />} /> 
        <Route path="/qfirst" element={<Qfirst />} />
        <Route path="/quest" element={<Quest />} />
        <Route path="/ymht" element={<Ymht />} />
        <Route path="/anxiety" element={<Anxiety />} />
        <Route path="/adhd" element={<Adhd />} />
        <Route path="/bipolar" element={<Bipolar />} />
        <Route path="/depression" element={<Depression />} />
        <Route path="/addiction" element={<Addiction />} />
        <Route path="/ptest" element={<Ptest />} />
        <Route path="/slotbooking" element={<SlotBooking />} />
        <Route path="/bookslot" element={<BookSlot />} />
        <Route path="/cancelslot" element={<Cancel />} />      
        <Route path="/therapists" element={<AddTherapist />} />
        <Route path="/manageslots" element={<ManageSlots />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </Router>
  );
}

export default App;
