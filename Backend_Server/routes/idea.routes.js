import express from "express";
import { analyzeIdea, getIdeas } from "../controllers/idea.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/analyze", protect, analyzeIdea);
router.get("/", protect, getIdeas);

export default router;