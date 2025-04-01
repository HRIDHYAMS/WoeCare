import React, { useState } from "react";
import { Container, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert } from "@mui/material";
import { updateUserScore } from "../../../Backend/firebase"; // Import function
import { getAuth, onAuthStateChanged } from "firebase/auth"; // ✅ Import Firebase Auth

const auth = getAuth(); // ✅ Initialize Auth

const questions = [
  "Do you feel a strong urge to use the substance/activity?",
  "Have you tried to cut down but found it difficult?",
  "Do you spend a lot of time obtaining, using, or recovering from it?",
  "Has it negatively affected your work, school, or relationships?",
  "Have you continued despite knowing its harmful effects?",
  "Do you feel anxious, restless, or irritable when not using it?",
  "Have you increased usage over time to get the same effect?",
  "Have you lost interest in hobbies or activities due to it?",
  "Have you experienced withdrawal symptoms?",
  "Have you continued using despite health risks?"
];

const scoreMapping = {
  Never: 0,
  Rarely: 1,
  Sometimes: 2,
  Often: 3,
  Always: 4,
};

const Addiction = () => {
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const handleOptionChange = (question, value) => {
    setResponses({ ...responses, [question]: value });
  };

  const handleSubmit = () => {
    if (Object.keys(responses).length < questions.length) {
      setError(true);
      return;
    }
    setError(false);

    const totalScore = Object.entries(responses).reduce(
      (acc, [_, value]) => acc + scoreMapping[value],
      0
    );

    let status = "";
    let resultText = "";

    if (totalScore <= 6) {
      status = "Low Risk / Safe Mode";
      resultText =
        "Great...!!No major concern, but maintaining a healthy lifestyle is essential." +
        ">> Staying active: Regular exercise can boost mood and reduce stress." +
        ">> Maintaining a healthy sleep routine: Good sleep is vital for mental clarity and emotional stability." +
        ">> Nurturing relationships: Social connections provide emotional support." +
        ">> Mindfulness: Continue practicing mindfulness or relaxation techniques to stay grounded." +
        "If you ever feel that your mental health starts to shift, don't hesitate to explore additional resources or reach out for support.";
    } else if (totalScore <= 15) {
      status = "Mild Addiction";
      resultText =
        "Some signs of dependence; consider self-regulation strategies." +
        ">>  Set Clear Boundaries – Limit the time or frequency of usage (e.g., reducing screen time, scheduled breaks, or controlled intake)." +
        ">>  Minimize Distractions: Work in a quiet, clutter-free environment to help with concentration." +
        ">>  Practice Mindfulness & Exercise: Activities like meditation, deep breathing, or physical exercise can help regulate impulsivity and restlessness." +
        ">>  Seek Guidance if Needed: If symptoms become more frequent or disruptive, consulting a mental health professional for strategies or therapy can be beneficial..";
        
    } else if(totalScore <= 22) {
        status = "Moderate Addiction";
        resultText =
        "Addiction traits are likely affecting your daily life, including work, studies, or relationships."
        "What You Can Do:"
        ">> Replace the Habit with Positive Alternatives – Engage in exercise, creative hobbies, or mindfulness practices."
        ">> Build a Support System : Stay connected with family, friends, and support groups for emotional stability."
        ">> Engage in Healthy Coping Mechanisms : Practice mindfulness, exercise, and engage in creative activities."
        ">> Stay Committed to Treatment : Adhere to medication, attend therapy, and be patient with progress."
            }
    else {
      status = "High Risk / Severe Symptoms";
      resultText =
        "We understand that you may be going through a difficult time." +
        ">> Please seek support from professionals." +
        "📞 Mind Empowered, Kalamassery – [8281992128]" +
        "Your well-being matters, and seeking help is a sign of strength." +
        "If you need urgent support, don’t hesitate to reach out.";
    }

    const formattedText = resultText.split(">>").map((line, index) => (
      index === 0 ? (
        <Typography key={index} variant="body1" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
          {line.trim()}
        </Typography>
      ) : (
        <Typography key={index} variant="body2" sx={{ ml: 2, color: "#34495e" }}>
          <strong style={{ color: "green" }}>➤</strong> {line.trim()}
        </Typography>
      )
    ));
    setResult(
      <Card sx={{ mt: 3, p: 2, bgcolor: "#f9f9f9" }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: "#1e8449", fontWeight: "bold" }}>🏆 Total Score: {totalScore} / {questions.length * 4}</Typography>
          <Typography variant="h6" sx={{ color: "#2980b9", fontWeight: "bold" }}>📊 Mental Health Status: {status}</Typography>
          {formattedText}
        </CardContent>
      </Card>
    );
    // ✅ Correctly update the score in Firebase
                        onAuthStateChanged(auth, async (user) => {
                          if (user) {
                            try {
                              await updateUserScore(user.uid, "Addiction Test", totalScore, 10);
                              console.log("Addiction Test Score Updated!");
                            } catch (error) {
                              console.error("Error updating score:", error);
                            }
                          } else {
                            console.log("User not logged in.");
                          }
                        });
  };

  return (
    
     <Container
         maxWidth="md"
         sx={{
           mt: 4,
           bgcolor: " #fed6e3",
           p: 3,
           borderRadius: 2,
           background: "linear-gradient(135deg, transparent, #fed6e3)", // ✅ Gradient background applied
         }}
       >
         <Typography
       variant="h4"
       align="center"
       gutterBottom
       sx={{ color: "#2c3e50", fontWeight: "bold" }} 
     >
       Addiction Test
     </Typography>
     
       
         {questions.map((question, index) => (
           <Card key={index} sx={{ mb: 2, p: 2, bgcolor: "rgb(238, 232, 234)", borderRadius: 2 }}>
             <CardContent>
               <FormControl component="fieldset">
                 <FormLabel sx={{ fontWeight: "bold", color: " #2c3e50" }}>{question}</FormLabel>
                 <RadioGroup
                   onChange={(e) => handleOptionChange(question, e.target.value)}
                   sx={{ flexDirection: "column" }} // ✅ Options arranged vertically
                 >
                   {Object.keys(scoreMapping).map((option) => (
                     <FormControlLabel key={option} value={option} control={<Radio />} label={option} sx={{ mt: 1 }} />
                   ))}
                 </RadioGroup>
               </FormControl>
             </CardContent>
           </Card>
         ))}
       
       <Button 
       variant="contained" 
       color="transparemt" 
       fullWidth sx={{ 
         mt: 2, 
         py: 1.5, 
         display: "block", 
         width: "50%",
         maxWidth: "600px",
         justifyContent: "center", // ✅ Centers text inside the button
         mx: "auto", // ✅ Centers the button itself
       }} 
       onClick={handleSubmit}
     >
       Submit
     </Button>
     
     
         {error && <Alert severity="error" sx={{ mt: 2 }}>⚠️ Please answer all questions before submitting.</Alert>}
         {result}
       </Container>
       );
     } 
     

export default Addiction;
