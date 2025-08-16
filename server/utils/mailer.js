import nodemailer from "nodemailer";
import { config } from "../config.js";

export async function sendEmail(to, subject, text) {
  // Check if email configuration is available
  if (!config.email.host || !config.email.user || !config.email.pass) {
    throw new Error("Email configuration not found. Please set EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in your .env file.");
  }

  // Create transporter with Mailtrap-optimized settings
  const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.port === 465, // true for 465, false for other ports
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
    // Mailtrap-specific settings
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates (common in testing)
    },
    // Connection timeout settings
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000,   // 30 seconds
    socketTimeout: 60000,     // 60 seconds
  });

  // Verify connection configuration
  try {
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully");
  } catch (error) {
    console.error("❌ SMTP connection failed:", error.message);
    throw new Error(`SMTP connection failed: ${error.message}`);
  }

  const recipients = String(to).split(",").map((e) => e.trim());

  try {
    const result = await transporter.sendMail({
      from: config.email.from,
      to: recipients,
      subject,
      text,
      // Add HTML version for better email clients
      html: text.replace(/\n/g, '<br>'),
    });

    console.log("📧 Email sent successfully:", {
      messageId: result.messageId,
      to: recipients,
      subject: subject
    });

    return {
      success: true,
      messageId: result.messageId,
      recipients: recipients
    };
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// Helper function to test email configuration
export async function testEmailConfig() {
  try {
    const transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();
    return { success: true, message: "SMTP configuration is valid" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
