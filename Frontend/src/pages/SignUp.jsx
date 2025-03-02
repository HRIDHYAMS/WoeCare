import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase";
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

      // Check if user is created and log user UID
      console.log("User created with UID:", user.uid);

      // Create a Timestamp from the dob input
      const dobTimestamp = Timestamp.fromDate(new Date(dob));
      console.log("DOB Timestamp:", dobTimestamp); // Log the dob timestamp

      // Set user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        dob: dobTimestamp,
        email,
        role,  // Store the selected role
        createdAt: Timestamp.now() // Track the creation date
      });

      alert("Sign Up Successful!");
      navigate("/login"); // Redirect to login after successful sign-up
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

      // Store Google user data in Firestore if not already stored
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        role,  // Store the selected role
        createdAt: Timestamp.now()
      });

      alert("Signed in successfully with Google!");
      navigate("/dashboard");
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
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

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
