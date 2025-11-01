// Script để thêm dữ liệu dictionary vào database
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

console.log("Seeding Dictionary Data...");

async function seedDictionary() {
  try {
    // Connect to database
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Define Word schema
    const wordSchema = new mongoose.Schema(
      {
        word: { type: String, required: true, unique: true },
        meaning: { type: String, required: true },
        category: { type: String, required: true },
        videoUrl: { type: String },
        thumbnail: { type: String },
        description: { type: String },
        difficulty: {
          type: String,
          enum: ["beginner", "intermediate", "advanced"],
          default: "beginner",
        },
      },
      { timestamps: true }
    );

    const Word = mongoose.model("Word", wordSchema);

    // Clear existing words
    console.log("\n Clearing existing words...");
    await Word.deleteMany({});
    console.log(" Existing words cleared");

    // Sample dictionary data
    const dictionaryData = [
      {
        word: "hello",
        meaning: "Xin chào",
        category: "greetings",
        videoUrl: "https://www.youtube.com/embed/SsLvqfTXo78",
        thumbnail: "https://cdn-icons-png.flaticon.com/512/5619/5619967.png",
        description: "A common greeting in sign language",
        difficulty: "beginner",
      },
      {
        word: "thank you",
        meaning: "Cảm ơn",
        category: "greetings",
        videoUrl: "https://videos-asl.lingvano.com/67-480p.mp4#t=0.05",
        thumbnail:
          "https://media.istockphoto.com/id/1254050669/vi/anh/ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-xinh-%C4%91%E1%BA%B9p-th%E1%BB%83-hi%E1%BB%87n-c%E1%BA%A3m-%C6%A1n-b%E1%BA%B1ng-ng%C3%B4n-ng%E1%BB%AF-k%C3%BD-hi%E1%BB%87u-tr%C3%AAn-n%E1%BB%81n-xanh.jpg?s=1024x1024&w=is&k=20&c=V-xiZ9algnHSYRuUGruzh-Zdd8Pa9C1d9bZ99Wf6Jdk=",
        description: "Expression of gratitude",
        difficulty: "beginner",
      },
      {
        word: "please",
        meaning: "Làm ơn",
        category: "greetings",
        videoUrl: "https://www.youtube.com/watch?v=Gkc5QES84dA",
        thumbnail:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fbabysignlanguage.com%2Fdictionary%2Fplease%2F&psig=AOvVaw3PGzKU8WHqeycPRMdrpqVs&ust=1761635157286000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJiiksLow5ADFQAAAAAdAAAAABAE",
        description: "Polite request expression",
        difficulty: "beginner",
      },
      {
        word: "goodbye",
        meaning: "Tạm biệt",
        category: "greetings",
        videoUrl:
          "https://app.lingvano.com/37edba92-1640-458e-bbd6-148fc79d6042",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/bye-bye-flash-card-jpg.jpeg",
        description: "Farewell expression",
        difficulty: "beginner",
      },
      {
        word: "yes",
        meaning: "Có",
        category: "responses",
        videoUrl:
          "https://app.lingvano.com/6f1096c3-09fa-406e-9071-a2bee9cdec7d",
        thumbnail:
          "https://i.ytimg.com/vi/0usayvOXzHo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAMFjgOm_hSmy4WP66FyaBLKMjtzg",
        description: "Affirmative response",
        difficulty: "beginner",
      },
      {
        word: "no",
        meaning: "Không",
        category: "responses",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/no-flash-card-jpg.jpeg",
        description: "Negative response",
        difficulty: "beginner",
      },
      {
        word: "help",
        meaning: "Giúp đỡ",
        category: "actions",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/help.svg",
        description: "Request for assistance",
        difficulty: "beginner",
      },
      {
        word: "water",
        meaning: "Nước",
        category: "objects",
        videoUrl: "https://www.youtube.com/watch?v=m49LzvNVTgc",
        thumbnail:
          "https://images.ctfassets.net/2ql69mthp94m/2rURHLKechy7FCsxtQJI7q/b824b256feddfb02254b3ddf246f9df5/water.png?w=720&fm=webp&q=70",
        description: "Essential liquid for life",
        difficulty: "beginner",
      },
      {
        word: "food",
        meaning: "Thức ăn",
        category: "objects",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/food.svg",
        description: "Something to eat",
        difficulty: "beginner",
      },
      {
        word: "family",
        meaning: "Gia đình",
        category: "people",
        videoUrl: "https://www.youtube.com/watch?v=VOnHnaNiVSM",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/family.svg",
        description: "Relatives and loved ones",
        difficulty: "intermediate",
      },
      {
        word: "friend",
        meaning: "Bạn bè",
        category: "people",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/friend.svg",
        description: "Close companion",
        difficulty: "beginner",
      },
      {
        word: "love",
        meaning: "Yêu thương",
        category: "emotions",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail:
          "/https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/love.svg",
        description: "Deep affection and care",
        difficulty: "intermediate",
      },
      {
        word: "happy",
        meaning: "Vui vẻ",
        category: "emotions",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/happy.svg",
        description: "Feeling of joy and contentment",
        difficulty: "beginner",
      },
      {
        word: "sad",
        meaning: "Buồn bã",
        category: "emotions",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/sad.svg",
        description: "Feeling of sorrow",
        difficulty: "beginner",
      },
      {
        word: "school",
        meaning: "Trường học",
        category: "places",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/school.svg",
        description: "Educational institution",
        difficulty: "beginner",
      },
      {
        word: "home",
        meaning: "Nhà",
        category: "places",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/house.svg",
        description: "Place where one lives",
        difficulty: "beginner",
      },
      {
        word: "work",
        meaning: "Công việc",
        category: "actions",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/work.svg",
        description: "Job or employment",
        difficulty: "beginner",
      },
      {
        word: "learn",
        meaning: "Học hỏi",
        category: "actions",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail: "https://www.lifeprint.com/asl101/images-signs/learn.3.gif",
        description: "Process of acquiring knowledge",
        difficulty: "beginner",
      },
      {
        word: "beautiful",
        meaning: "Đẹp",
        category: "descriptions",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/beautiful.svg",
        description: "Pleasing to the senses",
        difficulty: "intermediate",
      },
      {
        word: "you",
        meaning: "Mày",
        category: "descriptions",
        videoUrl:
          "https://app.lingvano.com/57893575-014f-4261-a1e9-0406302f08d0",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/dog-flash-card-jpg.jpeg",
        description: "Chỉ người đối diện đang nói chuyện cùng ",
        difficulty: "intermediate",
      },
      {
        word: "welcome",
        meaning: "Chào mừng",
        category: "descriptions",
        videoUrl:
          "https://app.lingvano.com/3f7e12cf-65af-4d9e-94b7-11f9dea7e8ff",
        thumbnail:
          "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/welcome.svg",
        description: "Mời ai đó đến chơi",
        difficulty: "intermediate",
      },
      {
        word: "it's me",
        meaning: "Là tôi",
        category: "descriptions",
        videoUrl:
          "https://app.lingvano.com/ccefe501-7de4-4037-988a-61b10aaf7eec",
        thumbnail:
          "https://www.british-sign.co.uk/british-sign-language/wp-content/uploads/2013/01/me2-852x930.png",
        description: "Mời ai đó đến chơi",
        difficulty: "intermediate",
      },
    ];

    // Insert words into database
    console.log("\n📝 Adding dictionary words...");
    const insertedWords = await Word.insertMany(dictionaryData);
    console.log(
      `✅ Successfully added ${insertedWords.length} words to database`
    );

    const categories = {};
    insertedWords.forEach((word) => {
      categories[word.category] = (categories[word.category] || 0) + 1;
    });

    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} words`);
    });

    // Count by difficulty
    const difficulties = {};
    insertedWords.forEach((word) => {
      difficulties[word.difficulty] = (difficulties[word.difficulty] || 0) + 1;
    });

    Object.entries(difficulties).forEach(([difficulty, count]) => {
      console.log(`   ${difficulty}: ${count} words`);
    });

    const helloResults = await Word.find({
      word: { $regex: "hello", $options: "i" },
    });
    console.log(`   Search for "hello": ${helloResults.length} results`);

    // Search for greetings
    const greetingResults = await Word.find({ category: "greetings" });
    console.log(`   Search for greetings: ${greetingResults.length} results`);

    const beginnerResults = await Word.find({ difficulty: "beginner" });
    console.log(
      `   Search for beginner words: ${beginnerResults.length} results`
    );
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed.");
    process.exit(0);
  }
}

seedDictionary();
