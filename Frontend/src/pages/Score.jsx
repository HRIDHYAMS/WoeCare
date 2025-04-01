import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Score = () => {
    const [scores, setScores] = useState({});
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                console.log("User authenticated:", currentUser); // Debugging line
                fetchScores(currentUser.uid);
            } else {
                setUser(null);
                setScores({});
                setLoading(false);
            }
        });

        return () => unsubscribe(); // Cleanup function
    }, []);

    const fetchScores = async (uid) => {
        setLoading(true);
        const userRef = doc(db, "userScores", uid); // User's document

        try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log("Fetched user data:", userData); // Debugging line
                setScores(userData.scores || {}); // Fetch scores map
            } else {
                console.log("No user document found."); // Debugging line
            }
        } catch (error) {
            console.error("Error fetching scores:", error);
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Your Test Scores</h2>
            {loading ? (
                <p style={styles.loadingText}>Loading scores...</p>
            ) : scores && Object.keys(scores).length > 0 ? (
                <ul style={styles.list}>
                    {Object.entries(scores).map(([testName, score]) => (
                        <li key={testName} style={styles.listItem}>
                            <strong style={styles.testName}>{testName}</strong>
                            <div style={styles.scoreDetails}>
                                <p style={styles.scoreText}>
                                    <strong>Obtained: </strong>{score.obtained}
                                </p>
                                <p style={styles.scoreText}>
                                    <strong>Total: </strong>{score.total}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={styles.noScores}>No test scores available.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "900px", // Larger container for better layout
        margin: "40px auto",
        padding: "40px", // Increased padding for a spacious feel
        background: "transparent", // Keeping the white background
        color: "#333", // Dark text for readability
        borderRadius: "20px", // Rounded corners for a modern look
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Modern font
        transition: "all 0.3s ease", // Smooth container transition for resizing
    },
    title: {
        fontSize: "36px", // Increased font size for better emphasis
        fontWeight: "700", // Bold title for stronger presence
        marginBottom: "40px", // Increased bottom margin for spacing
        color: "transparent", // Transparent color for gradient effect
        backgroundImage: "linear-gradient(45deg,rgb(159, 182, 204),rgb(206, 154, 154))", // Gradient background
        backgroundClip: "text", // Clipping background to the text only
        letterSpacing: "2px", // Increased letter spacing for a more airy look
        textTransform: "uppercase", // Making the text uppercase for emphasis
        display: "inline-block",
        paddingBottom: "12px", // Increased padding for bottom spacing
        textShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow to make it pop
        transition: "all 0.3s ease-in-out", // Smooth hover transition
    },
    
    loadingText: {
        fontSize: "20px",
        fontStyle: "italic",
        color: "#6c757d", // Light gray for loading text
        marginTop: "20px",
    },
    noScores: {
        fontSize: "18px",
        fontStyle: "italic",
        color: "#6c757d", // Light gray for "no scores" text
        marginTop: "20px",
    },
    list: {
        listStyle: "none",
        padding: "0",
        marginTop: "30px", // Added spacing between list and other elements
        animation: "fadeIn 1s ease-in-out", // Fade-in animation for the list
    },
    listItem: {
        background: "#ffffff", // White background for each list item
        margin: "16px 0", // Increased margin for better spacing between items
        padding: "20px",
        borderRadius: "15px", // Rounded corners for each item
        fontSize: "20px", // Larger font size for the list items
        transition: "all 0.3s ease", // Smooth transitions for hover effects
        border: "1px solid #e0e0e0", // Light border to separate items
        textAlign: "left", // Align text to the left for better readability
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for each item
        transform: "scale(1)", // Ensuring normal size by default
    },
    listItemHover: {
        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)", // Larger shadow on hover
        transform: "scale(1.05)", // Slight zoom effect on hover
    },
    testName: {
        fontSize: "24px", // Larger test name for emphasis
        fontWeight: "700", // Bold test name for emphasis
        marginBottom: "10px",
        color: "#1d3557", // Dark blue color for test names
        letterSpacing: "0.5px",
    },
    scoreDetails: {
        marginTop: "10px", // Spacing for the score details
    },
    scoreText: {
        fontSize: "18px", // Moderate font size for the scores
        margin: "8px 0", // Spacing between score lines
        color: "#333", // Dark text for scores
    },
    scoreValue: {
        fontWeight: "600", // Slightly bolder score values for better visibility
        color: "#007bff", // Blue color for score value
        fontSize: "22px", // Increased font size for score value
    },
    // Animation Keyframes for fade-in effect
    '@keyframes fadeIn': {
        '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
        },
        '100%': {
            opacity: '1',
            transform: 'translateY(0)',
        }
    },
};
export default Score;
