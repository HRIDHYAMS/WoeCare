import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../../Backend/firebase"; // Import provider and auth from your firebase setup
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle Email & Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;  // Extract the user object
    localStorage.setItem("email", user.email);
      if (role === "admin") {
        navigate('/admindashboard'); // Redirect Admins
      } else {
        navigate('/dashboard'); // Redirect Users
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Login Success:", user);
      localStorage.setItem("email", user.email)
      
      if (role === "admin") {
        navigate('/admindashboard'); // Redirect Admins
      } else {
        navigate('/dashboard'); // Redirect Users
      }
    } catch (err) {
      setError('Google login failed. Please try again');
      console.error("Error during Google login:", err.message);
    }
  };

  return (
    <div className="login-page">  {/* Ensures the page uses correct styles */}
      <div className="login-container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
  
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          {/* Role Selection */}
          <div className="role-selection">
            <label>
              <input 
                type="radio" 
                name="role" 
                value="user" 
                checked={role === "user"} 
                onChange={() => setRole("user")} 
              />
              User
            </label>
            <label>
              <input 
                type="radio" 
                name="role" 
                value="admin" 
                checked={role === "admin"} 
                onChange={() => setRole("admin")} 
              />
              Admin
            </label>
          </div>
  
          <button className="login-btn" type="submit">Login</button>
        </form>
  
        <button className="google-btn" onClick={handleGoogleLogin}>
          Login with Google
        </button>
  
        <div className="signup-link">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
  
};

export default Login;
