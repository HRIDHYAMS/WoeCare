import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "../../../Backend/firebase";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is user
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User created with UID:", user.uid);

      const dobTimestamp = Timestamp.fromDate(new Date(dob));
      console.log("DOB Timestamp:", dobTimestamp);

      await setDoc(doc(db, "users", user.uid), {
        name,
        dob: dobTimestamp,
        email,
        role,
        createdAt: Timestamp.now()
      });

      alert("Sign Up Successful!");
      if (role === "admin") {
        navigate('/admindashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message);
      console.error("Error during sign up:", error);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      provider.setCustomParameters({
        prompt: "select_account"
      });
  
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Success:", result.user);
  
      const user = result.user;
  
      // Reference to Firestore user document
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Fetched user data:", userData);
  
        // Navigate based on role
        if (userData.role === "admin") {
          navigate('/admindashboard'); // Redirect Admins
        } else {
          navigate('/dashboard'); // Redirect Users
        }
      } else {
        // If the user does not exist, set the default role to 'user'
        const newUserRole = role || "user"; // Use selected role or default to "user"
  
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          role: newUserRole,  // Store the role properly
          createdAt: Timestamp.now()
        });
  
        // Redirect based on newly assigned role
        if (newUserRole === "admin") {
          navigate('/admindashboard');
        } else {
          navigate('/dashboard');
        }
      }
  
      alert("Signed in successfully with Google!");
    } catch (error) {
      setError(error.message);
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create Your Account</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSignUp}>
  <div className="form-group">
    <label htmlFor="name">Name:</label>
    <input
      id="name"
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="dob">Date of Birth:</label>
    <input
      id="dob"
      type="date"
      placeholder="Date of Birth"
      value={dob}
      onChange={(e) => setDob(e.target.value)}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input
      id="email"
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="password">Password:</label>
    <input
      id="password"
      type="password"
      placeholder="Create a password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="confirmPassword">Confirm Password:</label>
    <input
      id="confirmPassword"
      type="password"
      placeholder="Confirm your password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
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

  <button type="submit" className="signup-btn">Sign Up</button>
</form>

        <button className="google-btn" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
