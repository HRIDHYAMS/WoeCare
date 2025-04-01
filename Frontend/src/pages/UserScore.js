import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../Backend/firebase"; // Ensure correct Firestore import

const updateUserScore = async (uid, testName, score) => {
    try {
        const userRef = doc(db, "UserScores", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // ✅ Correct way to update a nested field without overwriting
            await updateDoc(userRef, {
                [`tests.${testName}.testName`]: testName, // Added testName as a field
                [`tests.${testName}.score`]: score,
                [`tests.${testName}.date`]: new Date().toISOString()
            });
        } else {
            // If user doesn't exist, create a new record
            await setDoc(userRef, {
                tests: {
                    [testName]: {
                        testName: testName, // Added testName as a field
                        score: score,
                        date: new Date().toISOString()
                    }
                }
            });
        }

        console.log(`Score updated: ${testName} - ${score}`);
    } catch (error) {
        console.error("Error updating user score:", error);
    }
};

export { updateUserScore };
