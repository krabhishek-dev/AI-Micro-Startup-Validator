import Idea from "../models/idea.model.js";
import { runFullAnalysis } from "../services/aiOrchestrator.js";

export const analyzeIdea = async (req, res) => {
  try {
    const data = req.body;

    // 🔥 Run AI pipeline
    const result = await runFullAnalysis(data);

    // 💾 Save in DB
    const idea = await Idea.create({
      userId: req.user.id,
      ...data,
      result
    });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ userId: req.user.id });
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};