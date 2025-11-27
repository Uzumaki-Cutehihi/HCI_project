import express from "express";
import { saveSession, getLeaderboard, getGameHistory, startSession } from "../controllers/gameController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sessions", verifyToken, saveSession);
router.post("/start", verifyToken, startSession || ((req, res) => res.json({success: true})));
router.get("/leaderboard", getLeaderboard);
router.get("/history", verifyToken, getGameHistory);

export default router;