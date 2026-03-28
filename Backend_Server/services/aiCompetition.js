import { axiosInstance, safeJSONParse, withFallback } from "../utils/ai.util.js";

export const competitionAI = async (data) =>
  withFallback(async () => {
    const prompt = `
Analyze competition.

Idea: ${data.title}
${data.description}

Return JSON:
{
  "score": number (1-10),
  "competitors": [],
  "saturationLevel": "",
  "insights": ""
}
`;

    const res = await axiosInstance.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const text =
      res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return safeJSONParse(text);
  }, {
    score: 5,
    competitors: [],
    saturationLevel: "medium",
    insights: "Fallback competition analysis"
  });