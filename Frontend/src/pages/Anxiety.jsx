import React, { useState } from "react";
import { Container, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert } from "@mui/material";

const questions = [
  "Feeling nervous, anxious, or on edge?",
  "Not being able to stop or control worrying?",
  "How often do you feel like you lack interest or pleasure in activities you used to enjoy?",
  "Having trouble relaxing?",
  "Being so restless that it is hard to sit still??",
  "Becoming easily annoyed or irritable?",
  "Feeling afraid as if something awful might happen?"
];

const scoreMapping = {
  Never: 0,
  Rarely: 1,
  Sometimes: 2,
  Often: 3,
  Always: 4,
};

const Anxiety = () => {
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
        "Great...!!You are experiencing normal anxiety levels. Maintain healthy habits.\n" +
        ">> Staying active: Regular exercise can boost mood and reduce stress.\n" +
        ">> Maintaining a healthy sleep routine: Good sleep is vital for mental clarity and emotional stability.\n" +
        ">> Nurturing relationships: Social connections provide emotional support.\n" +
        ">> Mindfulness: Continue practicing mindfulness or relaxation techniques to stay grounded.\n" +
        "If you ever feel that your mental health starts to shift, don't hesitate to explore additional resources or reach out for support.";
    } else if (totalScore <= 13) {
      status = "Mild Anxiety";
      resultText =
        "Thank you for sharing your thoughts.You may feel occasional worry. Try relaxation techniques and stress management.\n" +
        ">> Regular Reflection: Journaling to process your feelings.\n" +
        ">> Stress Management: Activities like yoga or deep breathing.\n" +
        ">> Social Support: Connect with trusted family or friends.\n" +
        ">> Professional Guidance: Consider speaking to a therapist.\n" +
        ">> Mindfulness Practices: Apps like Headspace or Calm.\n" +
        ">> Physical Health: Exercise, proper sleep, and a balanced diet.\n" +
        "You have the ability to adjust your mindset and manage your emotions effectively.";
    } else if(totalScore <= 20) {
        status = "Moderate Anxiety";
        resultText =
        "Anxiety might be interfering with your daily life. Consider seeking support.\n"
        "What You Can Do:\n"
        ">> Practice Deep Breathing & Relaxation : Techniques like deep breathing, progressive muscle relaxation, or mindfulness meditation can help manage anxious feelings.\n" 
        ">> Exercise Regularly : Physical activity releases endorphins, which reduce stress and anxiety. Even a short daily walk can help."
        ">> Maintain a Healthy Routine : Eating nutritious food, staying hydrated, and getting enough sleep can improve your mental well-being."
        ">> Reach Out for Support : Talking to close friends, family, or a support group can provide emotional relief and reassurance."
        ">>  Consider Professional Help : If anxiety is significantly impacting your daily life, consulting a therapist or counselor can provide personalized strategies for managing stress and anxiety."

            }
    else {
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
       Anxiety Test
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
     
export default Anxiety;
