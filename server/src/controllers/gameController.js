import GameSession from "../models/GameSession.js";
import UserAchievement from "../models/UserAchievement.js";
import Achievement from "../models/Achievement.js";
import UserProfile from "../models/UserProfile.js";

// Lưu kết quả chơi game
export const saveSession = async (req, res) => {
  try {
    // FIX LỖI 500: Kiểm tra xem req.user có tồn tại không
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token không hợp lệ hoặc thiếu Middleware."
      });
    }

    const userId = req.user.id;
    const {
      gameMode,
      difficulty,
      score = 0,
      correctAnswers = 0,
      wrongAnswers = 0,
      totalQuestions = 0,
      timeSpent = 0,
      exercises = [],
      answers = [],
    } = req.body;

    // Lưu vào DB
    const newSession = await GameSession.create({
      userId,
      gameMode,
      difficulty,
      score,
      correctAnswers,
      wrongAnswers,
      totalQuestions,
      timeSpent,
      exercises,
      answers,
      isCompleted: true,
    });

    // Cập nhật thông tin UserProfile
    const userProfile = await UserProfile.findOne({ userId });
    if (userProfile) {
      userProfile.totalScore += score;
      userProfile.totalGamesPlayed += 1;
      userProfile.totalCorrectAnswers += correctAnswers;
      userProfile.totalWrongAnswers += wrongAnswers;
      userProfile.lastPlayedAt = new Date();
      await userProfile.save();
    }


    res.json({
      success: true,
      message: "Session saved successfully",
      data: newSession,
    });

  } catch (error) {
    console.error("Error saving session:", error);
    res.status(500).json({ success: false, message: "Lỗi lưu kết quả chơi game", error: error.message });
  }
};

export const startSession = async (req, res) => {
  res.json({ success: true, message: "Session started" });
};


export const getLeaderboard = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const leaderboard = await UserProfile.find()
        .sort({ totalScore: -1 })
        .limit(parseInt(limit))
        .populate("userId", "name avatar");
    res.json({ success: true, leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGameHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await GameSession.find({ userId }).sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};