import { axiosInstance, withFallback } from "../utils/ai.util.js";

export const riskAI = async (data) =>
  withFallback(async () => {
    const res = await axiosInstance.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        inputs: data.description,
        parameters: {
          candidate_labels: ["low risk", "medium risk", "high risk"]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
        }
      }
    );

    const label = res.data?.labels?.[0] || "medium risk";

    return {
      score:
        label === "high risk" ? 8 :
        label === "medium risk" ? 5 : 2,
      overallRiskLevel: label,
      insights: "Risk classified using NLP model"
    };
  }, {
    score: 5,
    overallRiskLevel: "medium",
    insights: "Fallback risk analysis"
  });