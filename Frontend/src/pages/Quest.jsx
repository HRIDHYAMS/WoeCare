import React, { useState } from "react";
import { Container, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert } from "@mui/material";

const questions = [
  "Do you often experience this: 'I am so stressed out'?",
  "How often do you compare yourself to others?",
  "Do you often experience this: 'I feel stuck'?",
  "Do you often feel that you lack motivation to do daily tasks?",
  "Do you often experience this: 'I am so burned out'?",
  "Do you often experience this: 'I can't take it anymore'?",
  "Do you often experience this: 'I am so depressed'?",
  "How often do you experience sleeplessness?",
  "Do you often experience this: 'I have anxiety problems'?",
  "Do you often experience this: 'I feel great today'?",
  "How often do you feel overwhelmed by your responsibilities?",
  "Do you find it difficult to concentrate on tasks for extended periods?",
  "How often do you feel disconnected from people around you?",
  "Do you struggle to find joy in activities you once enjoyed?",
  "How often do you feel physically exhausted without any clear reason?"
];

const scoreMapping = {
  Never: 0,
  Rarely: 1,
  Sometimes: 2,
  Often: 3,
  Always: 4,
};

const Quest = () => {
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

    if (totalScore <= 15) {
      status = "Low Risk / Safe Mode";
      resultText =
        "Great news! Your responses indicate that you are currently experiencing good mental health.\n" +
        ">> Staying active: Regular exercise can boost mood and reduce stress.\n" +
        ">> Maintaining a healthy sleep routine: Good sleep is vital for mental clarity and emotional stability.\n" +
        ">> Nurturing relationships: Social connections provide emotional support.\n" +
        ">> Mindfulness: Continue practicing mindfulness or relaxation techniques to stay grounded.\n" +
        "If you ever feel that your mental health starts to shift, don't hesitate to explore additional resources or reach out for support.";
    } else if (totalScore <= 40) {
      status = "Moderate / Intermediate";
      resultText =
        "Thank you for sharing your thoughts. You are currently experiencing moderate mental health challenges.\n" +
        ">> Regular Reflection: Journaling to process your feelings.\n" +
        ">> Stress Management: Activities like yoga or deep breathing.\n" +
        ">> Social Support: Connect with trusted family or friends.\n" +
        ">> Professional Guidance: Consider speaking to a therapist.\n" +
        ">> Mindfulness Practices: Apps like Headspace or Calm.\n" +
        ">> Physical Health: Exercise, proper sleep, and a balanced diet.\n" +
        "You have the ability to adjust your mindset and manage your emotions effectively.";
    } else {
      status = "High Risk / Severe";
      resultText =
        "We understand that you may be going through a difficult time.\n" +
        ">> Please seek support from professionals.\n" +
        "📞 Mind Empowered, Kalamassery – [8281992128]\n" +
        "Your well-being matters, and seeking help is a sign of strength.\n" +
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
          <Typography variant="h6" sx={{ color: "#1e8449", fontWeight: "bold" }}>🏆 Total Score: {totalScore}</Typography>
          <Typography variant="h6" sx={{ color: "#2980b9", fontWeight: "bold" }}>📊 Mental Health Status: {status}</Typography>
          {formattedText}
        </CardContent>
      </Card>
    );
  };

  return (
    
     <Container maxWidth="md" sx={{ mt: 4, bgcolor: " #F8E8EE", p: 3, borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "#2c3e50" }}>
        🧠 Mental Health Questionnaire
      </Typography>

      {questions.map((question, index) => (
        <Card key={index} sx={{ mb: 2, p: 2, bgcolor: " #B0C4DE", borderRadius: 2 }}>
          <CardContent>
            <FormControl component="fieldset">
              <FormLabel sx={{ fontWeight: "bold", color: "#2c3e50" }}>{question}</FormLabel>
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

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5 }} onClick={handleSubmit}>
        Submit
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>⚠️ Please answer all questions before submitting.</Alert>}
      {result}
    </Container>
  );
};

export default Quest;
