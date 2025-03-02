import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNmojNKqAGKf985g-McKbZEGN8p66SJRQ",
  authDomain: "woecare.firebaseapp.com",
  projectId: "woecare",
  storageBucket: "woecare.firebasestorage.app",
  messagingSenderId: "92111561765",
  appId: "1:92111561765:web:6224cb3a5455e0663d8bcc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore

// Function to store user data in Firestore after sign-up
const storeUserInFirestore = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName || "Anonymous",
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error storing user in Firestore: ", error);
  }
};

// Function to handle Google login
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google Login Success:", user);

    // Store user in Firestore after successful Google login
    await storeUserInFirestore(user);
  } catch (error) {
    console.error("Error during Google login:", error);
  }
};

// Export functions and Firebase services
export { auth, db, provider, storeUserInFirestore, handleGoogleLogin };
