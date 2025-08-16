// Configuration file with default values
// Users can override these by setting environment variables

export const config = {
  // Server Configuration
  port: process.env.PORT || 8080,
  
  // OpenAI API Configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY || null,
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 1000,
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.3
  },
  
  // Email Configuration
  email: {
    host: process.env.EMAIL_HOST || null,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    user: process.env.EMAIL_USER || null,
    pass: process.env.EMAIL_PASS || null,
    from: process.env.FROM_EMAIL || 'noreply@meeting-summarizer.com'
  }
};

// Helper function to check if required configuration is present
export function validateConfig() {
  const warnings = [];
  
  if (!config.openai.apiKey || config.openai.apiKey === 'your_openai_api_key_here') {
    warnings.push("⚠️  OpenAI API key not configured. Set OPENAI_API_KEY in your .env file to enable AI summarization.");
  }
  
  if (!config.email.host || !config.email.user || !config.email.pass) {
    warnings.push("⚠️  Email configuration incomplete. Set EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in your .env file to enable email functionality.");
  }
  
  if (warnings.length > 0) {
    console.log("\n🚀 Configuration Setup Required:");
    console.log("=".repeat(50));
    warnings.forEach(warning => console.log(warning));
    console.log("\n📝 Quick Setup:");
    console.log("1. Copy: cp server/env.example server/.env");
    console.log("2. Edit server/.env with your credentials");
    console.log("3. Restart the server");
    console.log("\n🔑 Required for AI: OPENAI_API_KEY");
    console.log("📧 Required for email: EMAIL_HOST, EMAIL_USER, EMAIL_PASS");
    console.log("=".repeat(50));
  } else {
    console.log("✅ All configuration loaded successfully!");
  }
  
  return warnings.length === 0;
}
