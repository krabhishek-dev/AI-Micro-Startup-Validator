import axios from "axios";

export const generalAI = async (data) => {
  try {
    const prompt = `
Analyze this startup idea:
Title: ${data.title}
Description: ${data.description}

Return JSON:
{
  "summary": "",
  "strengths": []
}
`;

    const res = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    return JSON.parse(res.data.choices[0].message.content);
  } catch {
    return { summary: "Fallback summary", strengths: [] };
  }
};