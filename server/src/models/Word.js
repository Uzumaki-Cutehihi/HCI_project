import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true }, // từ gốc
  meaning: { type: String }, // nghĩa
  category: { type: String }, // danh mục
  videoUrl: { type: String }, // video minh họa
  thumbnail: { type: String }, // hình ảnh thu nhỏ
  description: { type: String }, // mô tả
  difficulty: {
    type: String,
    enum: ["easy", "beginner", "intermediate", "medium", "hard"],
    default: "easy",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Word", wordSchema);
