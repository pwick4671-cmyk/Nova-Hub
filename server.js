import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* =========================
   HOME
========================= */

app.get("/", (req, res) => {
  res.json({
    name: "Nova API",
    status: "online",
    mode: "demo",
    message: "Nova Backend is working!"
  });
});

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    status: "healthy"
  });
});

/* =========================
   DEMO AI
========================= */

function novaAnswer(message) {
  const text = message.toLowerCase();

  if (
    text.includes("مرحبا") ||
    text.includes("سلام") ||
    text.includes("hello") ||
    text.includes("hi")
  ) {
    return "مرحبا 👋 أنا Nova! كيفاش نعاونك اليوم؟";
  }

  if (
    text.includes("nova") ||
    text.includes("شكون إنت") ||
    text.includes("من أنت")
  ) {
    return "أنا Nova 🤖، المساعد الذكي متاع Nova Hub.";
  }

  if (
    text.includes("web app") ||
    text.includes("موقع") ||
    text.includes("مشروع")
  ) {
    return `🔥 فكرة Nova Hub:

• AI Chat
• Voice
• حفظ المحادثات
• أدوات AI
• Dashboard
• User Accounts
• Memory
• Backend API

والـFrontend متاعك مربوط بالـBackend.`;
  }

  if (
    text.includes("html") ||
    text.includes("javascript") ||
    text.includes("code") ||
    text.includes("كود")
  ) {
    return `💻 تنجم تبني المشروع بـ:

HTML
CSS
JavaScript
Node.js
Express

وبعد نزيدوا Database وAuthentication وAI API.`;
  }

  if (
    text.includes("ai") ||
    text.includes("ذكاء اصطناعي")
  ) {
    return `🤖 الذكاء الاصطناعي يخدم هكّا:

Nova Frontend
↓
Nova Backend
↓
AI API
↓
الجواب يرجع للـNova`;
  }

  return `فهمتك 👍

إنت قلت:
"${message}"

أنا Nova Demo حاليًا.

الـBackend يخدم، أما الـAI الحقيقي موش مربوط توّا.`;
}

/* =========================
   CHAT API
========================= */

app.post("/api/chat", async (req, res) => {
  try {
    const {
      message,
      history = []
    } = req.body;

    if (
      !message ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const answer =
      novaAnswer(message);

    res.json({
      answer,
      mode: "demo",
      historyReceived: history.length
    });

  } catch (error) {
    console.error(
      "Nova API Error:",
      error
    );

    res.status(500).json({
      error: "Nova API error"
    });
  }
});

/* =========================
   404
========================= */

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(
    `Nova API running on port ${PORT}`
  );
});
