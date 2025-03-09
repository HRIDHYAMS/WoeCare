import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Homepage component
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Fixed case sensitivity issue
import Chatbot from "./pages/Chatbot"; // Added chatbot route
import AdminDashboard from "./pages/AdminDashboard"; // Import Admin Dashboard
import Quest from "./pages/Quest";
import Qfirst from "./pages/Qfirst";
import YMHT from "./pages/YMHT";
import Anxiety from "./pages/Anxiety";  
import Adhd from "./pages/Adhd";  
import Bipolar from "./pages/Bipolar";  
import Addiction from "./pages/Addiction";
import Depression from "./pages/Depression";
import Ptest from "./pages/Ptest";  

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
        <Route path="/Qfirst" element={<Qfirst />} />
        <Route path="/YMHT" element={<YMHT />} />
        <Route path="/Anxiety" element={<Anxiety />} />
        <Route path="/Adhd" element={<Adhd />} />
        <Route path="/Bipolar" element={<Bipolar />} />
        <Route path="/Addiction" element={<Addiction />} />
        <Route path="/Depression" element={<Depression />} />
        <Route path="/Ptest" element={<Ptest />} />
      </Routes>
    </Router>
  );
}

export default App;
