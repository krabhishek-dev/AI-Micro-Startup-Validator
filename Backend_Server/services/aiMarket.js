import { axiosInstance, safeJSONParse, withFallback } from "../utils/ai.util.js";

export const marketAI = async (data) =>
  withFallback(async () => {
    const prompt = `
Evaluate market potential.

Idea: ${data.title}
${data.description}

Return JSON:
{
  "score": number (1-10),
  "demandLevel": "",
  "growthPotential": "",
  "insights": ""
}
`;

    const res = await axiosInstance.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command",
        prompt,
        max_tokens: 200,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`
        }
      }
    );

    const text = res.data.generations?.[0]?.text || "";
    return safeJSONParse(text);
  }, {
    score: 5,
    demandLevel: "medium",
    growthPotential: "medium",
    insights: "Fallback market analysis"
  });