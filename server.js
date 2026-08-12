import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Nova API",
    status: "online"
  });
});

app.get("/health", (req, res) => {
  res.json({
    ok: true
  });
});

app.post("/api/chat", async (req, res) => {

  try {

    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const messages = [
      {
        role: "system",
        content:
          "You are Nova, a helpful AI assistant. Answer clearly and safely."
      },

      ...history.slice(-20),

      {
        role: "user",
        content: message
      }
    ];

    const response =
      await client.chat.completions.create({
        model:
          process.env.OPENAI_MODEL || "gpt-5-mini",

        messages
      });

    const answer =
      response.choices[0].message.content;

    res.json({
      answer
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Nova API error"
    });

  }

});

app.listen(PORT, () => {
  console.log(
    `Nova API running on port ${PORT}`
  );
});
