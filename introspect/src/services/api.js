const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";
 
// Helper to make a call to Claude API
async function callClaude(systemPrompt, userMessage) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });
 
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || "API call failed");
  }
 
  const data = await response.json();
  return data.content[0].text;
}
 
// Generate the first question for an interview
export async function generateFirstQuestion(config) {
  const systemPrompt = `You are an AI interviewer conducting a ${config.role} interview.
Interviewer style: ${config.style} (${config.styleDesc})
Candidate level: ${config.level} (${config.levelDesc})
 
Rules:
- Ask ONLY ONE interview question at a time.
- Keep the question relevant to the role and level.
- If style is Friendly, be warm and encouraging.
- If style is Professional, be formal and concise.
- If style is Strict, be direct and challenging.
- Return ONLY the question, no extra text, no numbering.`;
 
  const userMessage = `Start the interview. Ask the first question for a ${config.role} candidate at ${config.level} level.`;
 
  return await callClaude(systemPrompt, userMessage);
}
 
// Generate the next question based on conversation history
export async function generateNextQuestion(config, conversationHistory) {
  const systemPrompt = `You are an AI interviewer conducting a ${config.role} interview.
Interviewer style: ${config.style}
Candidate level: ${config.level}
 
Rules:
- Ask ONLY ONE follow-up question based on the candidate's previous answer.
- The question must be relevant to what they said AND the role.
- Progressively go deeper or explore new areas.
- Return ONLY the question, no extra text.
- If the interview has had 8+ exchanges, you can ask a final wrap-up question.`;
 
  // Build conversation summary for context
  const historyText = conversationHistory
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n\n");
 
  const userMessage = `Here is the interview so far:\n\n${historyText}\n\nGenerate the next interview question.`;
 
  return await callClaude(systemPrompt, userMessage);
}
 
// Generate a full feedback report after the interview ends
export async function generateFeedback(config, conversationHistory) {
  const systemPrompt = `You are an expert interview evaluator. Analyze the interview and return a JSON report.
Return ONLY valid JSON, no markdown, no explanation.
 
JSON format:
{
  "overallScore": <number 0-100>,
  "clarity": <number 0-100>,
  "consistency": <number 0-100>,
  "responseLength": <number 0-100>,
  "confidence": <number 0-100>,
  "technicalClarity": <number 0-100>,
  "strengths": [<string>, <string>, <string>],
  "weaknesses": [<string>, <string>, <string>],
  "summary": "<2-3 sentence summary>",
  "improvementTips": [<string>, <string>, <string>]
}`;
 
  const historyText = conversationHistory
    .map((item, i) => `Q${i + 1}: ${item.question}\nA${i + 1}: ${item.answer}`)
    .join("\n\n");
 
  const userMessage = `Role: ${config.role}, Level: ${config.level}, Style: ${config.style}
 
Interview transcript:
${historyText}
 
Evaluate this candidate and return the JSON report.`;
 
  const raw = await callClaude(systemPrompt, userMessage);
 
  // Parse JSON safely
  try {
    return JSON.parse(raw);
  } catch {
    // Try to extract JSON from response
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Could not parse feedback JSON");
  }
}