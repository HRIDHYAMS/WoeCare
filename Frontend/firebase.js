import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

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
const db = getFirestore(app);

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

const updateUserScore = async (uid, testName, obtainedScore, numberOfQuestions) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not logged in");
    return;
  }

  const userEmail = user.email; // ✅ Get the user's email
  const userRef = doc(db, "userScores", uid); // ✅ Ensure collection name matches Firestore

  // Log number of questions for debugging
  console.log("Number of Questions: ", numberOfQuestions);

  // Validate numberOfQuestions and calculate totalScore
  let totalScore = 0;
  if (typeof numberOfQuestions === "number" && !isNaN(numberOfQuestions) && numberOfQuestions > 0) {
    totalScore = numberOfQuestions * 4; // Calculate total score based on number of questions
    console.log("Total Score: ", totalScore); // Debugging total score calculation
  } else {
    console.error("Invalid numberOfQuestions:", numberOfQuestions); // Log error if invalid
    return; // Early return if numberOfQuestions is invalid
  }

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Update the existing user document with new score
      await updateDoc(userRef, {
        [`scores.${testName}`]: { obtained: obtainedScore, total: totalScore },
        email: userEmail,
        lastTestName: testName,
        lastScore: obtainedScore,
      });
    } else {
      // If no document exists, create a new one with the first score
      await setDoc(userRef, {
        scores: {
          [testName]: { obtained: obtainedScore, total: totalScore },
        },
        email: userEmail,
        firstTestName: testName,
        firstScore: obtainedScore,
      });
    }

    console.log("Score updated successfully");
  } catch (error) {
    console.error("Error updating score:", error);
  }
};

// Function to get user scores
const getUserScores = async (uid) => {
  const userRef = doc(db, "userScores", uid);
  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().scores;
    } else {
      return null; // No scores found for this user
    }
  } catch (error) {
    console.error("Error getting user scores:", error);
  }
};

// ✅ Export only Firebase-related services
export { auth, db, provider, storeUserInFirestore, handleGoogleLogin, updateUserScore, getUserScores };
