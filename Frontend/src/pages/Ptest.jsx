import React, { useState } from "react";
import { Container, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert } from "@mui/material";

const questions = [
  "Does your child seem sad, withdrawn, or uninterested in activities they once enjoyed?",
  "Does your child frequently complain of headaches, stomach aches, or fatigue without a medical cause?",
  "Has your child shown increased irritability, anger, or mood swings?",
  "Does your child struggle with focusing on tasks or completing schoolwork?",
  "Has your child been avoiding social interactions or isolating themselves from friends and family?",
  "Does your child express excessive fears, worries, or anxiety about daily situations?",
  "Have you noticed changes in your child's eating or sleeping habits? (e.g., sleeping too much/little, overeating/undereating)	",
  "Does your child show a lack of confidence or express feelings of worthlessness?",
  "Has your child engaged in self-harm behaviors or spoken about hurting themselves?",
  "Has your child lost interest in school, hobbies, or activities they previously enjoyed?"
];

const scoreMapping = {
  Never: 0,
  Rarely: 1,
  Sometimes: 2,
  Often: 3,
  Always: 4,
};

const Ptest = () => {
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

    if (totalScore <= 10) {
      status = "Minimal or No Concerns";
      resultText =
        "Great...!!Your child appears emotionally well. Encourage healthy communication and positive habits.\n" +
        ">> Encourage Open Communication – Create a safe space where your child feels comfortable expressing thoughts and emotions without fear of judgment..\n" +
        ">> Maintaining a healthy sleep routine: Good sleep is vital for mental clarity and emotional stability.\n" +
        ">> Validate Their Feelings – Acknowledge their emotions, whether big or small, and help them process them in a healthy way.\n" +
        ">> Promote Healthy Social Interactions – Encourage friendships and social activities that help build confidence and emotional resilience.\n" +
        " Consistently practicing these habits can help your child build strong emotional resilience, ensuring better mental health in the long run.";
    } else if (totalScore <= 20) {
      status = "Mild Concerns";
      resultText =
        "Some signs of emotional distress. Observe changes, encourage open discussions, and provide support.\n" +
        ">>  Create a Safe Emotional Environment – Let your child know they can share their feelings without judgment or punishment.\n" +
        ">>  Observe Patterns & Triggers – Try to identify situations that may be causing distress, such as academic pressure, peer relationships, or personal struggles.\n" +
        ">>  Help Them Express Their Emotions – If they struggle to talk, encourage journaling, drawing, or using creative outlets to express themselves.\n" +
        ">>  Teach Simple Coping Strategies – Deep breathing, mindfulness, or short breaks from stressors can help them regulate emotions.\n";
        
    } else if(totalScore <= 30) {
        status = "Moderate Concerns";
        resultText =
        "Emotional difficulties are noticeable. Consider consulting a school counselor or therapist for guidance.\n"
        "What You Can Do:\n"
        ">> Collaborate with School Staff – Teachers and counselors can provide insight into behavior changes at school and suggest intervention strategies."
        ">> Monitor for Worsening Symptoms – If distress escalates into self-harm thoughts, extreme withdrawal, or severe anxiety, immediate professional help is necessary."
        ">>  Have a Calm and Open Discussion – Let your child know that their feelings are valid and they are not alone."
        ">> Validate Their Feelings – Avoid dismissing their emotions and instead reassure them that it’s okay to feel this way."
            }
    else {
      status = "Severe Concerns";
      resultText =
        "We understand that this situation may be challenging.\n" +
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
       Parent Test: Your Child’s Mental Health Test
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
     
export default Ptest;
