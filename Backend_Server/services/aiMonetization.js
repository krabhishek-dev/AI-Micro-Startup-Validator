import { axiosInstance, safeJSONParse, withFallback } from "../utils/ai.util.js";

export const monetizationAI = async (data) =>
  withFallback(async () => {
    const prompt = `
Suggest monetization strategies.

Idea: ${data.title}
${data.description}

Return JSON:
{
  "score": number (1-10),
  "models": [],
  "pricingStrategy": "",
  "scalability": "",
  "insights": ""
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
    score: 5,
    models: ["freemium"],
    pricingStrategy: "basic",
    scalability: "medium",
    insights: "Fallback monetization"
  });