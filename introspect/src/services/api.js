const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;


async function callGroq(messages) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.6,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "API Error");
  }

  return data?.choices?.[0]?.message?.content;
}


export async function generateFirstQuestion(config) {
  const prompt = `
You are a professional interviewer.

RULES:
- Ask ONLY ONE question
- DO NOT include introduction
- DO NOT write steps or instructions
- DO NOT explain anything

Start interview directly.

Role: ${config.role}
Level: ${config.level}
Style: ${config.style}

Ask a simple first question like:
"Tell me about yourself."
`;

  return callGroq([{ role: "user", content: prompt }]);
}


export async function generateNextQuestion(config, conversation) {
  const prompt = `
You are an interviewer.

Ask ONLY ONE next question based on conversation.

RULES:
- Only one question
- No explanation
- No extra text

Conversation:
${JSON.stringify(conversation)}

Role: ${config.role}
`;

  return callGroq([{ role: "user", content: prompt }]);
}


export async function generateFeedback(config, conversation, durationSeconds = 0) {
  const hasAnswers = conversation?.some((c) => c.answer?.trim());

  if (!hasAnswers) {
    return {
      overallScore: 0,
      clarity: 0,
      consistency: 0,
      responseLength: 0,
      confidence: 0,
      technical: 0,
      timeManagement: 0,
      summary: "No answers were given.",
      strengths: [],
      weaknesses: ["No participation"],
      improvementTips: ["Try answering questions"],
    };
  }

  const prompt = `
You are an expert interviewer.

Return ONLY valid JSON.

IMPORTANT:
- Do NOT hallucinate high scores
- Base scores ONLY on real answers
- If answers are weak → low score

JSON format:
{
  "overallScore": number,
  "clarity": number,
  "consistency": number,
  "responseLength": number,
  "confidence": number,
  "technical": number,
  "timeManagement": number,
  "summary": string,
  "strengths": [],
  "weaknesses": [],
  "improvementTips": []
}

Conversation:
${JSON.stringify(conversation)}

Duration: ${durationSeconds}s
`;

  try {
    const result = await callGroq([
      { role: "user", content: prompt },
    ]);

    return JSON.parse(result);
  } catch (err) {
    return {
      overallScore: 0,
      clarity: 0,
      consistency: 0,
      responseLength: 0,
      confidence: 0,
      technical: 0,
      timeManagement: 0,
      summary: "Error generating feedback",
      strengths: [],
      weaknesses: [],
      improvementTips: [],
    };
  }
}
