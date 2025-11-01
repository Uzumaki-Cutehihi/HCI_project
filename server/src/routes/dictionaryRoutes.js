import express from "express";
import {
  searchWords,
  getWordById,
  getCategories,
  getWordsByCategory,
} from "../controllers/dictionaryController.js";

const router = express.Router();

// Tìm từ
router.get("/", searchWords);

//(demo)
// Lấy bằng id
router.get("/word/:id", getWordById);

// Lấy bằng cate
router.get("/categories", getCategories);

router.get("/category/:category", getWordsByCategory);

export default router;
