import dotenv from "dotenv";
import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables from .env file
dotenv.config();

const app = express();
const uploads = multer({ dest: "uploads/" });

// Enable CORS so that your frontend (possibly served on a different port) can access the backend
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

// Ensure the API key is available
if (!process.env.GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is missing in the .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/get", uploads.single("file"), async (req, res) => {
  const userInput = req.body.msg;
  const file = req.file;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const therapistPrompt = `You are a mental health assistant. Please provide supportive, empathetic advice in clear, grammatically correct English. Focus on offering calm advice for stress, anxiety, and emotional well-being. Encourage mindfulness, self-care, and positive thinking. If the user expresses distress, gently suggest helpful strategies or resources.

    Keep responses short (2-10 lines) to avoid overwhelming the user.
    Avoid repetitive greetings or using the user’s name too often.
    Offer reassurance and coping strategies based on the user's feelings without overloading with information.
    Also you can ask questions to the user depending on the context to get more information and give better suggestions!
    If the user expresses severe distress (e.g., mentions self-harm, suicidal thoughts, or extreme hopelessness), provide helpline numbers and urge them to seek professional help immediately. Example:
          "I'm really sorry you're feeling this way. You are not alone. Please reach out to a trusted person or a professional. If you need immediate help, here are some helplines:

          - India: Suicide Prevention Lifeline (1860 266 2345) or Snehi (91-9582208181)
          - USA: National Suicide Prevention Lifeline (988)
          - UK: Samaritans (116 123)
          - If you’re in another country, please seek a local crisis helpline. You are valued and deserve support."
    `;


    let prompt = [therapistPrompt, userInput];

    if (file) {
      const fileData = fs.readFileSync(file.path);
      const image = {
        inlineData: {
          data: fileData.toString("base64"),
          mimeType: file.mimetype,
        },
      };
      prompt.push(image);
    }

    const response = await model.generateContent(prompt);
    console.log(response);
    res.send(response.response.text());
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).send("An error occurred while generating the response");
  } finally {
    if (file) fs.unlinkSync(file.path);
  }
});

// Score Submission API
app.post("/submit", (req, res) => {
  const { totalScore } = req.body;
  let resultText = "";
  let riskLevel = "";

  if (totalScore <= 15) {
    riskLevel = "Low Risk / Not Severe";
    resultText = "Your mental health is in good condition. Stay mindful and take care!";
  } else if (totalScore <= 40) {
    riskLevel = "Moderate / Intermediate";
    resultText = "You may be experiencing some mental health challenges. Consider seeking support.";
  } else {
    riskLevel = "High Risk / Severe";
    resultText = "Please reach out to a mental health professional or a helpline.";
  }

  res.json({
    score: totalScore,
    level: riskLevel,
    message: resultText,
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});