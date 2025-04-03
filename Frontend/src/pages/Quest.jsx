import React, { useState } from "react";
import { Container, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert } from "@mui/material";
import { updateUserScore } from "../../firebase"; // Import function
import { getAuth, onAuthStateChanged } from "firebase/auth"; // ✅ Import Firebase Auth

const auth = getAuth(); // ✅ Initialize Auth

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
  "How often do you feel physically exhausted without any clear reason?",
  "Do you feel a strong urge to use the substance/activity?",
  "Have you tried to cut down but found it difficult?",
  "Do you struggle with concentration or decision-making?",
  "Have you experienced thoughts of self-harm or suicide?"
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

    let stressCount = 0, anxietyCount = 0, depressionCount = 0, addictionCount = 0, bipolarCount = 0;

    const stressQuestions = [
      "Do you often experience this: 'I am so stressed out'?",
      "Do you often experience this: 'I can't take it anymore'?",
      "Do you often experience this: 'I am so burned out'?",
      "How often do you feel overwhelmed by your responsibilities?",
    ];

    const anxietyQuestions = [
      "Do you often experience this: 'I have anxiety problems'?",
      "Do you often feel physically exhausted without any clear reason?",
      "How often do you feel disconnected from people around you?",
    ];

    const depressionQuestions = [
      "Do you often experience this: 'I am so depressed'?",
      "Do you struggle to find joy in activities you once enjoyed?",
      "Do you often experience this: 'I feel stuck'?",
      "Do you often feel that you lack motivation to do daily tasks?",
    ];

    const addictionQuestions = [
      "Do you feel a strong urge to use the substance/activity?",
      "Have you tried to cut down but found it difficult?"
    ];

    const bipolarQuestions = [
      "Do you struggle with concentration or decision-making?",
      "Have you experienced thoughts of self-harm or suicide?"
    ];

    stressQuestions.forEach((q) => {
      if (responses[q] === "Often" || responses[q] === "Always") stressCount++;
    });

    anxietyQuestions.forEach((q) => {
      if (responses[q] === "Often" || responses[q] === "Always") anxietyCount++;
    });

    depressionQuestions.forEach((q) => {
      if (responses[q] === "Often" || responses[q] === "Always") depressionCount++;
    });

    addictionQuestions.forEach((q) => {
      if (responses[q] === "Often" || responses[q] === "Always") addictionCount++;
    });

    bipolarQuestions.forEach((q) => {
      if (responses[q] === "Often" || responses[q] === "Always") bipolarCount++;
    });

    let prediction = "Your mental health seems stable. Keep maintaining a balanced lifestyle!";

    if (stressCount >= 3 && anxietyCount >= 2 && depressionCount >= 3) {
      prediction = "You may have severe mental health issues. It is advisable to seek professional help.";
    } else if (stressCount >= 3 && anxietyCount >= 2) {
      prediction = "You may be experiencing high stress and anxiety. Consider relaxation techniques and therapy.";
    } else if (depressionCount >= 3) {
      prediction = "You may be dealing with depression. Seeking emotional support or therapy might help.";
    } else if (stressCount >= 2 || anxietyCount >= 2) {
      prediction = "Mild stress or anxiety detected. Self-care activities might help you.";
    } else if (addictionCount >= 1) {
      prediction = "Signs of addiction detected. Take gradual steps to reduce addictive behaviors.";
    } else if (bipolarCount >= 1) {
      prediction = "Signs of bipolar detected.";
    }
    let status = "";
    let resultText = "";
    if (totalScore <= 15) {
      status = "Low Risk / Safe Mode";
      resultText =
        "Great news! Your responses indicate that you are currently experiencing good mental health." +
        ">> Staying active: Regular exercise can boost mood and reduce stress." +
        ">> Maintaining a healthy sleep routine: Good sleep is vital for mental clarity and emotional stability." +
        ">> Nurturing relationships: Social connections provide emotional support." +
        ">> Mindfulness: Continue practicing mindfulness or relaxation techniques to stay grounded." +
        "If you ever feel that your mental health starts to shift, don't hesitate to explore additional resources or reach out for support.";
    } else if (totalScore <= 40) {
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
  
    //setResult(<Alert severity="info" sx={{ mt: 2 }}>{prediction}</Alert>);
    setResult(
      <Card sx={{ mt: 2, p: 2, bgcolor: "#e3f2fd", borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: " #0d47a1", fontWeight: "bold" }}>
            Mental Health Assessment Result
          </Typography>
          <Typography variant="h6" sx={{ color: "#1e8449", fontWeight: "bold" }}>🏆 Total Score: {totalScore} / {questions.length * 4}</Typography>
          <Typography variant="h6" sx={{ color: " #0d47a1", fontWeight: "bold" }}>📊 Mental Health Status: {status}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {prediction}
          </Typography>
          {formattedText}
        </CardContent>
      </Card>
    );


    // ✅ Correctly update the score in Firebase
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await updateUserScore(user.uid, "General Mental Health Test", totalScore,19);
          console.log("General Mental Health Test Score Updated!");
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
          bgcolor: "#fed6e3",
          p: 3,
          borderRadius: 2,
          background: "linear-gradient(135deg, transparent, #fed6e3)", // ✅ Gradient background applied
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#2c3e50", fontWeight: "bold" }}>
          General Mental Health Test
        </Typography>
  
        {questions.map((question, index) => (
          <Card key={index} sx={{ mb: 2, p: 2, bgcolor: "rgb(238, 232, 234)", borderRadius: 2 }}>
            <CardContent>
              <FormControl component="fieldset">
                <FormLabel sx={{ fontWeight: "bold", color: "#2c3e50" }}>{question}</FormLabel>
                <RadioGroup onChange={(e) => handleOptionChange(question, e.target.value)}>
                  {Object.keys(scoreMapping).map((option) => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
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
  

export default Quest;
