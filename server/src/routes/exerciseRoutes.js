import express from "express";
import {
  getRandomExercise,
  getAllExercises,
  getExerciseById,
} from "../controllers/exerciseController.js";

const router = express.Router();

router.get("/random", getRandomExercise);

router.get("/", getAllExercises);

//lấy ID của bài tập từ schema Exercise
router.get("/:id", getExerciseById);

export default router;
