import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Import your homepage component
import SignUp from './pages/SignUp';
import Login from './pages/Login'; // Import the Login component
import Dashboard from './pages/dashboard'; // Import Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} /> {/* After login, navigate here */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;



