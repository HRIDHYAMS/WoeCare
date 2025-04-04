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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchScores(currentUser.uid);
            } else {
                setUser(null);
                setScores({});
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchScores = async (uid) => {
        setLoading(true);
        const userRef = doc(db, "userScores", uid);

        try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setScores(userData.scores || {});
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
    ) : scores && typeof scores === "object" && Object.keys(scores).length > 0 ? (
        <ul style={styles.list}>
    {Array.isArray(scores) ? (
        scores.map((attempt, index) => (
            <li key={index} style={styles.listItem}>
                <p style={styles.testName}>
                    <strong> </strong> {attempt.testName || "Unknown Test"}
                </p>
                <div style={styles.scoreDetails}>
                    <p style={styles.scoreText}>
                        <strong>Obtained: </strong> {attempt.obtained}
                    </p>
                    <p style={styles.scoreText}>
                        <strong>Total: </strong> {attempt.total}
                    </p>
                    <p style={styles.dateText}>
    <strong>Completed on: </strong> 
    {attempt.timestamp
        ? new Date(attempt.timestamp).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
        : "N/A"}
</p>

                </div>
            </li>
        ))
    ) : (
        Object.keys(scores).map((testName, index) => {
            const attempt = scores[testName]; // ✅ Extract test details correctly
            return (
                <li key={index} style={styles.listItem}>
                    <p style={styles.testName}>
                        <strong> </strong> {testName}
                    </p>
                    <div style={styles.scoreDetails}>
                        <p style={styles.scoreText}>
                            <strong>Obtained: </strong> {attempt.obtained}
                        </p>
                        <p style={styles.scoreText}>
                            <strong>Total: </strong> {attempt.total}
                        </p>
                        <p style={styles.dateText}>
    <strong>Completed on: </strong> 
    {attempt.timestamp
        ? new Date(attempt.timestamp).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
        : "N/A"}
</p>

                    </div>
                </li>
            );
        })
    )}
</ul>

    ) : (
        <p style={styles.noScores}>No test scores available.</p>
    )}
</div>
    );
};
const styles = {
    container: {
        maxWidth: "900px",
        margin: "40px auto",
        padding: "40px",
        background: "transparent",
        color: "#333",
        borderRadius: "20px",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        transition: "all 0.3s ease",
    },
    title: {
        fontSize: "36px",
        fontWeight: "700",
        marginBottom: "40px",
        color: "transparent",
        backgroundImage: "linear-gradient(45deg, rgb(159, 182, 204), rgb(206, 154, 154))",
        backgroundClip: "text",
        letterSpacing: "2px",
        textTransform: "uppercase",
        display: "inline-block",
        paddingBottom: "12px",
        textShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
    },
    loadingText: {
        fontSize: "20px",
        fontStyle: "italic",
        color: "#6c757d",
        marginTop: "20px",
    },
    noScores: {
        fontSize: "18px",
        fontStyle: "italic",
        color: "#6c757d",
        marginTop: "20px",
    },
    list: {
        listStyle: "none",
        padding: "0",
        marginTop: "30px",
    },
    listItem: {
        background: "#ffffff",
        margin: "16px 0",
        padding: "20px",
        borderRadius: "15px",
        fontSize: "20px",
        transition: "all 0.3s ease",
        border: "1px solid #e0e0e0",
        textAlign: "left",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    },
    testName: {
        fontSize: "24px",
        fontWeight: "700",
        marginBottom: "10px",
        color: "#1d3557",
        letterSpacing: "0.5px",
    },
    scoreDetails: {
        marginTop: "10px",
    },
    scoreText: {
        fontSize: "18px",
        margin: "8px 0",
        color: "#333",
    },
    dateText: {
        fontSize: "16px",
        color: "#555",
        fontStyle: "italic",
    },
};

export default Score;
