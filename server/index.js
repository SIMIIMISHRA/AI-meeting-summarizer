import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { config, validateConfig } from "./config.js";
import { summarizeText } from "./utils/llm.js";
import { sendEmail, testEmailConfig } from "./utils/mailer.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "dist")));

// Validate configuration and show warnings
validateConfig();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    port: config.port,
    emailConfigured: !!(config.email.host && config.email.user && config.email.pass),
    openaiConfigured: !!(config.openai.apiKey && config.openai.apiKey !== 'your_openai_api_key_here')
  });
});

// Test email configuration route
app.get("/api/test-email", async (req, res) => {
  try {
    const result = await testEmailConfig();
    if (result.success) {
      res.json({ 
        success: true, 
        message: "Email configuration is valid",
        details: {
          host: config.email.host,
          port: config.email.port,
          user: config.email.user,
          from: config.email.from
        }
      });
    } else {
      res.status(400).json({ 
        success: false, 
        error: result.message 
      });
    }
  } catch (error) {
    console.error("Email test failed:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to test email configuration" 
    });
  }
});

// Summarize route
app.post("/api/summarize", async (req, res) => {
  const { transcript, instruction } = req.body;
  if (!transcript || !instruction) {
    return res.status(400).json({ error: "Transcript and instruction required" });
  }
  try {
    const summary = await summarizeText(transcript, instruction);
    res.json({ summary });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

// Email route
app.post("/api/send-email", async (req, res) => {
  const { summary, to } = req.body;
  if (!summary || !to) {
    return res.status(400).json({ error: "Summary and email required" });
  }
  try {
    const result = await sendEmail(to, "Meeting Summary", summary);
    res.json({ 
      success: true, 
      message: "Email sent successfully",
      messageId: result.messageId,
      recipients: result.recipients
    });
  } catch (e) {
    console.error("Email sending failed:", e);
    res.status(500).json({ 
      error: "Failed to send email", 
      details: e.message 
    });
  }
});
// Fallback: if no API route matches, serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`📧 Email configured: ${config.email.host ? 'Yes' : 'No'}`);
  console.log(`🤖 OpenAI configured: ${config.openai.apiKey && config.openai.apiKey !== 'your_openai_api_key_here' ? 'Yes' : 'No'}`);
});
