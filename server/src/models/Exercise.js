import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  word: { type: String, required: true }, // từ cần đoán
  wordMeaning: { type: String, required: true }, // nghĩa tiếng Việt
  videoUrl: { type: String }, // video minh họa
  thumbnail: { type: String }, // hình ảnh
  options: { type: [String], required: true }, // các lựa chọn (gồm đáp án đúng)
  correctAnswer: { type: String, required: true }, // đáp án đúng
  category: { type: String }, // danh mục
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
    },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Exercise", exerciseSchema);
