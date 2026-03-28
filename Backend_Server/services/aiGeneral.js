import { axiosInstance, safeJSONParse, withFallback } from "../utils/ai.util.js";

export const generalAI = async (data) =>
  withFallback(async () => {
    const prompt = `
Analyze this startup idea.

Title: ${data.title}
Description: ${data.description}

Return JSON:
{
  "summary": "",
  "strengths": [],
  "clarityScore": number (1-10)
}
`;

    const res = await axiosInstance.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Return only valid JSON."
          },
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    return safeJSONParse(res.data.choices[0].message.content);
  }, {
    summary: "Basic summary",
    strengths: [],
    clarityScore: 5
  });