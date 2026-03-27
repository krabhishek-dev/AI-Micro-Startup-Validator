import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import ideaRoutes from "./routes/idea.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);

export default app;