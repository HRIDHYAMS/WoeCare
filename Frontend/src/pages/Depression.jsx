import React, { useState } from "react";
import { Container, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert } from "@mui/material";
import { updateUserScore } from "../../../Backend/firebase"; // Import function
import { getAuth, onAuthStateChanged } from "firebase/auth"; // ✅ Import Firebase Auth

const auth = getAuth(); // ✅ Initialize Auth

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure",
  "Trouble concentrating on things, such as reading or watching TV",
  "Moving or speaking so slowly that others notice, or being overly restless",
   "Thoughts of self-harm or that you would be better off dead"
];

const scoreMapping = {
  Never: 0,
  Rarely: 1,
  Sometimes: 2,
  Often: 3,
  Always: 4,
};

const Depression = () => {
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

    if (totalScore <= 9) {
      status = "Low Risk / Safe Mode";
      resultText =
        "Great...!!You seem to have little to no depressive symptoms. Maintain a healthy lifestyle and self-care." +
        ">> Staying active: Regular exercise can boost mood and reduce stress." +
        ">> Maintaining a healthy sleep routine: Good sleep is vital for mental clarity and emotional stability." +
        ">> Nurturing relationships: Social connections provide emotional support." +
        ">> Mindfulness: Continue practicing mindfulness or relaxation techniques to stay grounded." +
        "If you ever feel that your mental health starts to shift, don't hesitate to explore additional resources or reach out for support.";
    } else if (totalScore <= 18) {
      status = "Moderate Symptoms";
      resultText =
        "Maintain a daily routine to regain a sense of control and stability." +
        ">>  Increase Physical Activity – Regular exercise, such as walking or yoga, can boost mood and reduce stress.." +
        ">>  Engage in Hobbies – Activities like painting, music, or reading provide relaxation and joy." +
        ">>  Stay Socially Connected – Talk to trusted friends or family members to avoid isolation.." +
        ">>  Seek Guidance if Needed: If symptoms become more frequent or disruptive, consulting a mental health professional for strategies or therapy can be beneficial..";
        
    } else if(totalScore <= 27) {
        status = "High Symptoms";
        resultText =
        "Depression traits are likely affecting your daily life, including work, studies, or relationships." +
        "What You Can Do:"+
        ">> Reach out to a mental health professional for guidance."+
        " An online counseling service based in Kerala, offering individual, couples, and child therapy.Website: heiwaa.com"+
        ">> Prioritize self-care—small steps like structured routines, social support, and relaxation techniques can help."+
        ">> Monitor your mood and triggers—track your emotions to understand patterns."+
        "You’re not alone, and help is available. Seeking support is a step toward healing. 💙."

            }
    else {
      status = "High Risk / Severe Symptoms";
      resultText =
        "We understand that you may be going through a difficult time." +
        ">> Please seek support from professionals." +
        "📞 Mind Empowered, Kalamassery : [8281992128]" +
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
              await updateUserScore(user.uid, "Depression Test", totalScore,9);
              console.log("Depression Test Score Updated!");
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
      sx={{ color: "#2c3e50", fontWeight: "bold" }} // ✅ Title is now bold
    >
      Depression Test
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
    
export default Depression;
