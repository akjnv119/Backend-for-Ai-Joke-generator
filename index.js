
import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import { GoogleGenAI } from "@google/genai";


dotenv.config();
const app = express()
app.use(cors());
app.use(express.json());
const Port= process.env.PORT || 3000

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/joke", async (req, res) => {
  try {
    const { category } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Tell me a short funny ${category} type joke .`,
    });

    res.json({
      joke:response.text,
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(Port,()=>{
    console.log(`App is running on Port ${Port}`);
    
})
