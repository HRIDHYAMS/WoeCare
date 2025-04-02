import React, { useState } from "react";
import { Container, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert } from "@mui/material";
import { updateUserScore } from "../../../Backend/firebase"; // Import function
import { getAuth, onAuthStateChanged } from "firebase/auth"; // ✅ Import Firebase Auth
const auth = getAuth(); // ✅ Initialize Auth

const questions = [
  "Felt sad, down, or hopeless",
  "Do you feel tired or have low energy most of the time?",
  "How often do you feel like you lack interest or pleasure in activities you used to enjoy?",
  "Do you frequently feel nervous, anxious, or on edge?",
  "How often do you have trouble relaxing or calming down?",
  "Do you feel overwhelmed by your daily responsibilities (school, family, social life)?",
  "How well have you been sleeping in the past two weeks?",
  "Do you find it difficult to focus or concentrate on tasks?",
  "Do you feel like you have supportive friends or family members you can talk to?",
  "Have you ever had thoughts of hurting yourself or others?",
  "Do you engage in unhealthy coping mechanisms (self-harm, substance use, etc.)?"
];

const scoreMapping = {
  Never: 0,
  Rarely: 1,
  Sometimes: 2,
  Often: 3,
  Always: 4,
};

const Ymht = () => {
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const handleOptionChange = (question, value) => {
    setResponses({ ...responses, [question]: value });
  };

  const handleSubmit = async () => {
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

    if (totalScore <= 10) {
      status = "Low Risk / Safe Mode";
      resultText =
        "Great news! Your responses indicate that you are currently experiencing good mental health." +
        ">> Staying active: Regular exercise can boost mood and reduce stress." +
        ">> Maintaining a healthy sleep routine: Good sleep is vital for mental clarity and emotional stability." +
        ">> Nurturing relationships: Social connections provide emotional support." +
        ">> Mindfulness: Continue practicing mindfulness or relaxation techniques to stay grounded." +
        "If you ever feel that your mental health starts to shift, don't hesitate to explore additional resources or reach out for support.";
    } else if (totalScore <= 25) {
      status = "Moderate / Intermediate";
      resultText =
        "Thank you for sharing your thoughts. You are currently experiencing moderate mental health challenges." +
        ">> Regular Reflection: Journaling to process your feelings." +
        ">> Stress Management: Activities like yoga or deep breathing." +
        ">> Social Support: Connect with trusted family or friends." +
        ">> Professional Guidance: Consider speaking to a therapist." +
        ">> Mindfulness Practices: Apps like Headspace or Calm." +
        ">> Physical Health: Exercise, proper sleep, and a balanced diet." +
        "You have the ability to adjust your mindset and manage your emotions effectively.";
    } else {
      status = "High Risk / Severe";
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
          await updateUserScore(user.uid, "Youth Mental Health Test", totalScore,11);
          console.log("Youth Mental Health Test Score Updated!");
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
        Youth Mental Health Test
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
        color="transparent"
        fullWidth
        sx={{
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
};

export default Ymht;
