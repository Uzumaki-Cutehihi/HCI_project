// Script để thêm dữ liệu exercises vào database
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

console.log(" Seeding Exercise Data...");

async function seedExercises() {
  try {
    // Connect to database
    await mongoose.connect(MONGO_URI);
    console.log(" Connected to MongoDB");

    // Define Exercise schema
    const exerciseSchema = new mongoose.Schema({
      word: { type: String, required: true },
      wordMeaning: { type: String, required: true },
      videoUrl: { type: String },
      thumbnail: { type: String },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
      category: { type: String },
      difficulty: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner",
      },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    });

    const Exercise = mongoose.model("Exercise", exerciseSchema);

    // Clear existing exercises
    console.log("\n  Clearing existing exercises...");
    await Exercise.deleteMany({});
    console.log(" Existing exercises cleared");

    // Sample exercise data
    const exerciseData = [
      {
        word: "hello",
        wordMeaning: "Xin chào",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-hello.jpg",
        options: ["hello", "goodbye", "thanks", "sorry"],
        correctAnswer: "hello",
        category: "greetings",
        difficulty: "beginner",
      },
      {
        word: "thank you",
        wordMeaning: "Cảm ơn",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-thank-you.jpg",
        options: ["please", "thank you", "welcome", "goodbye"],
        correctAnswer: "thank you",
        category: "greetings",
        difficulty: "beginner",
      },
      {
        word: "family",
        wordMeaning: "Gia đình",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-family.jpg",
        options: ["friend", "family", "teacher", "student"],
        correctAnswer: "family",
        category: "people",
        difficulty: "intermediate",
      },
      {
        word: "friend",
        wordMeaning: "Bạn bè",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-friend.jpg",
        options: ["family", "friend", "neighbor", "colleague"],
        correctAnswer: "friend",
        category: "people",
        difficulty: "beginner",
      },
      {
        word: "water",
        wordMeaning: "Nước",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-water.jpg",
        options: ["food", "water", "drink", "eat"],
        correctAnswer: "water",
        category: "objects",
        difficulty: "beginner",
      },
      {
        word: "food",
        wordMeaning: "Thức ăn",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-food.jpg",
        options: ["water", "food", "bread", "milk"],
        correctAnswer: "food",
        category: "objects",
        difficulty: "beginner",
      },
      {
        word: "love",
        wordMeaning: "Yêu thương",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-love.jpg",
        options: ["hate", "love", "like", "dislike"],
        correctAnswer: "love",
        category: "emotions",
        difficulty: "intermediate",
      },
      {
        word: "happy",
        wordMeaning: "Vui vẻ",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-happy.jpg",
        options: ["sad", "happy", "angry", "tired"],
        correctAnswer: "happy",
        category: "emotions",
        difficulty: "beginner",
      },
      {
        word: "school",
        wordMeaning: "Trường học",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-school.jpg",
        options: ["home", "school", "office", "park"],
        correctAnswer: "school",
        category: "places",
        difficulty: "beginner",
      },
      {
        word: "home",
        wordMeaning: "Nhà",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-home.jpg",
        options: ["school", "home", "garden", "store"],
        correctAnswer: "home",
        category: "places",
        difficulty: "beginner",
      },
      {
        word: "help",
        wordMeaning: "Giúp đỡ",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-help.jpg",
        options: ["help", "hurt", "wait", "stop"],
        correctAnswer: "help",
        category: "actions",
        difficulty: "beginner",
      },
      {
        word: "please",
        wordMeaning: "Làm ơn",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "/person-signing-please.jpg",
        options: ["thank you", "sorry", "please", "welcome"],
        correctAnswer: "please",
        category: "greetings",
        difficulty: "beginner",
      },
    ];

    // Insert exercises into database
    console.log("\n Adding exercises...");
    const insertedExercises = await Exercise.insertMany(exerciseData);
    console.log(
      `✅ Successfully added ${insertedExercises.length} exercises to database`
    );

    // Display summary
    console.log("\n Exercise Summary:");
    console.log(`   Total exercises: ${insertedExercises.length}`);

    // Count by category
    const categories = {};
    insertedExercises.forEach((exercise) => {
      categories[exercise.category] = (categories[exercise.category] || 0) + 1;
    });

    console.log("\n Exercises by category:");
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} exercises`);
    });

    // Count by difficulty
    const difficulties = {};
    insertedExercises.forEach((exercise) => {
      difficulties[exercise.difficulty] =
        (difficulties[exercise.difficulty] || 0) + 1;
    });

    console.log("\n🎯 Exercises by difficulty:");
    Object.entries(difficulties).forEach(([difficulty, count]) => {
      console.log(`   ${difficulty}: ${count} exercises`);
    });

    console.log("\n Exercise seeding completed successfully!");
    console.log(" Database is ready for game testing");
  } catch (error) {
    console.error(" Exercise seeding failed:");
    console.error("Error:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("\n Database connection closed.");
    process.exit(0);
  }
}

seedExercises();
