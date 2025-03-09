import React, { useState } from "react";
import { Container, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert } from "@mui/material";

const questions = [
  "Do you find it hard to stay focused on tasks or conversations?",
  "Do you frequently get distracted by unrelated thoughts or stimuli?",
  "Do you struggle to complete projects or tasks before starting new ones?",
  "Do you often forget appointments, deadlines, or personal responsibilities?",
  "Do you experience restlessness or difficulty sitting still for extended periods?",
  "Do you frequently interrupt others or speak before thinking?",
  "Do you struggle with organization and time management?"
];

const scoreMapping = {
  Never: 0,
  Rarely: 1,
  Sometimes: 2,
  Often: 3,
  Always: 4,
};

const Adhd = () => {
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

    if (totalScore <= 7) {
      status = "Low Risk / Safe Mode";
      resultText =
        "Great...!!You are experiencing normal ADHD levels. Maintain healthy habits.\n" +
        ">> Staying active: Regular exercise can boost mood and reduce stress.\n" +
        ">> Maintaining a healthy sleep routine: Good sleep is vital for mental clarity and emotional stability.\n" +
        ">> Nurturing relationships: Social connections provide emotional support.\n" +
        ">> Mindfulness: Continue practicing mindfulness or relaxation techniques to stay grounded.\n" +
        "If you ever feel that your mental health starts to shift, don't hesitate to explore additional resources or reach out for support.";
    } else if (totalScore <= 15) {
      status = "Moderate Symptoms";
      resultText =
        "You may have occasional difficulties with attention, impulsivity, or hyperactivity, but they are manageable.\n" +
        ">>  Use External Supports: Rely on planners, reminders, or digital tools to stay organized.\n" +
        ">>  Minimize Distractions: Work in a quiet, clutter-free environment to help with concentration.\n" +
        ">>  Practice Mindfulness & Exercise: Activities like meditation, deep breathing, or physical exercise can help regulate impulsivity and restlessness.\n" +
        ">>  Seek Guidance if Needed: If symptoms become more frequent or disruptive, consulting a mental health professional for strategies or therapy can be beneficial..\n";
        
    } else if(totalScore <= 22) {
        status = "High Symptoms";
        resultText =
        "ADHD traits are likely affecting your daily life, including work, studies, or relationships.\n"
        "What You Can Do:\n"
        ">> Structure Your Environment: Minimize distractions by creating a clutter-free workspace and using timers, planners, or task-management apps."
        ">> Break Tasks Into Small Steps: Large projects can feel overwhelming—divide them into smaller, actionable tasks with set deadlines."
        ">> Use External Reminders: Digital calendars, alarms, sticky notes, or accountability partners can help track responsibilities."
        ">> Practice Mindfulness & Relaxation: Techniques like deep breathing, exercise, or meditation can help manage impulsivity and stress."
        ">> Set Realistic Goals: Accept that perfection isn’t necessary—focus on progress and celebrate small achievements."
        ">> Seek Professional Support: Therapy (such as CBT for ADHD) or medication (if needed) can provide additional coping strategies..\n ";

            }
    else {
      status = "High Risk / Severe Symptoms";
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
       ADHD Test
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
     

export default Adhd;
