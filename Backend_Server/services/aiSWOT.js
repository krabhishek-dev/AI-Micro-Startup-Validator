import { axiosInstance, safeJSONParse, withFallback } from "../utils/ai.util.js";

export const swotAI = async (data) =>
  withFallback(async () => {
    const prompt = `
Generate SWOT analysis.

Idea: ${data.title}
${data.description}

Return JSON:
{
  "strengths": [],
  "weaknesses": [],
  "opportunities": [],
  "threats": []
}
`;

    const res = await axiosInstance.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Return JSON only" },
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
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  });