import OpenAI from "openai";
import { config } from "../config.js";

let client = null;

// Initialize OpenAI client only if API key is available
if (config.openai.apiKey && config.openai.apiKey !== 'your_openai_api_key_here') {
  client = new OpenAI({
    apiKey: config.openai.apiKey
  });
}

export async function summarizeText(transcript, instruction) {
  // Check if OpenAI client is properly configured
  if (!client) {
    throw new Error("OpenAI API key not configured. Please set OPENAI_API_KEY in your .env file.");
  }

  const prompt = `You are a professional meeting notes summarizer. Your task is to create a clear, structured summary based on the user's specific instruction.

User's Custom Instruction: "${instruction}"

Please provide a well-organized summary that follows this structure:

**Title:** [Brief, descriptive title for the meeting]

**TL;DR:** [2-3 sentence executive summary]

**Key Points:**
- [Main discussion point 1]
- [Main discussion point 2]
- [Main discussion point 3]
- [Continue as needed...]

**Action Items:**
- [Owner/Person] [Specific task] - [Due date if mentioned]
- [Continue as needed...]

**Next Steps:** [Any follow-up actions or decisions made]

**Notes:** [Additional context or important details]

<TRANSCRIPT>
${transcript}
</TRANSCRIPT>

Remember to:
1. Follow the user's custom instruction closely
2. Keep the summary concise but comprehensive
3. Highlight actionable items clearly
4. Use professional, clear language
5. Organize information logically`;

  try {
    const res = await client.chat.completions.create({
      model: config.openai.model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: config.openai.maxTokens,
      temperature: config.openai.temperature
    });

    return res.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate summary. Please check your API key and try again.");
  }
}
