import { generalAI } from "./aiGeneral.js";
import { marketAI } from "./aiMarket.js";
import { competitionAI } from "./aiCompetition.js";
import { monetizationAI } from "./aiMonetization.js";
import { riskAI } from "./aiRisk.js";
import { swotAI } from "./aiSWOT.js";
import { calculateScore } from "../utils/score.util.js";

export const runFullAnalysis = async (data) => {
  try {
    // Parallel Execution
    const [
      general,
      market,
      competition,
      monetization,
      risk,
      swot
    ] = await Promise.all([
      generalAI(data),
      marketAI(data),
      competitionAI(data),
      monetizationAI(data),
      riskAI(data),
      swotAI(data)
    ]);

    const finalScore = calculateScore({
      market,
      competition,
      monetization,
      risk
    });

    return {
      general,
      market,
      competition,
      monetization,
      risk,
      swot,
      finalScore
    };
  } catch (err) {
    throw new Error("AI Orchestration failed");
  }
};