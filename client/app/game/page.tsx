"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { apiService } from "@/lib/api";

interface Exercise {
  _id: string;
  word: string;
  wordMeaning: string;
  videoUrl: string;
  thumbnail: string;
  options: string[];
  correctAnswer: string;
  category: string;
  difficulty: string;
}

export default function GamePage() {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load random exercise
  const loadExercise = async () => {
    setLoading(true);
    setError("");
    setSelectedAnswer(null);
    setShowResult(false);

    try {
      // Dùng Exercise API thay vì Dictionary API
      const response = await apiService.exercises.getRandom();

      // Handle different response formats
      const exerciseData = response.data?.data || response.data;

      if (!exerciseData) {
        setError("Không tìm thấy bài tập. Vui lòng thử lại.");
        return;
      }

      // Ensure exercise has required fields
      if (
        !exerciseData.word ||
        !exerciseData.options ||
        !exerciseData.correctAnswer
      ) {
        setError("Dữ liệu bài tập không đầy đủ. Vui lòng thử lại.");
        return;
      }

      // Shuffle options để random vị trí đáp án
      if (exerciseData.options && exerciseData.options.length > 0) {
        exerciseData.options = shuffleArray([...exerciseData.options]);
      }

      setExercise(exerciseData);
    } catch (err: any) {
      console.error("Error loading exercise:", err);

      // Better error messages
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 404) {
          setError("Không tìm thấy bài tập. Vui lòng thử lại sau.");
        } else if (err.response.status >= 500) {
          setError("Lỗi server. Vui lòng thử lại sau.");
        } else {
          setError(err.response.data?.message || "Không thể tải câu hỏi.");
        }
      } else if (err.request) {
        // Request was made but no response received
        setError(
          "Không thể kết nối tới server. Vui lòng kiểm tra kết nối hoặc thử lại sau."
        );
      } else {
        // Something else happened
        setError("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Shuffle array
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Load exercise on mount
  useEffect(() => {
    loadExercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answers =
    exercise?.options.map((option, idx) => {
      const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-orange-500",
      ];
      return {
        id: option,
        label: option,
        color: colors[idx % colors.length],
      };
    }) || [];

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleCheckAnswer = () => {
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    loadExercise();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Guess the Sign Game
        </h1>
        <p className="text-muted-foreground mb-2">
          Watch the sign language video carefully and try to guess the correct
          word that is being expressed in the video.
        </p>
        <p className="text-muted-foreground">
          After watching the video, select one of the options below that you
          believe corresponds to the word shown in the video.
        </p>
      </div>

      <div className="border-t pt-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Đang tải câu hỏi...</p>
          </div>
        )}

        {!loading && !error && exercise && (
          <>
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="mb-4 text-center">
                  <h2 className="text-2xl font-bold mb-2">
                    {exercise.wordMeaning}
                  </h2>
                  <p className="text-muted-foreground">
                    Category: {exercise.category} • Difficulty:{" "}
                    {exercise.difficulty}
                  </p>
                </div>

                <div className="aspect-video bg-gradient-to-br from-green-400 to-green-600 rounded-lg overflow-hidden relative mb-6">
                  <img
                    src={exercise.thumbnail}
                    alt={`Sign language for ${exercise.word}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {answers.map((answer) => (
                    <Button
                      key={answer.id}
                      variant="outline"
                      className={`h-16 text-lg font-semibold ${
                        selectedAnswer === answer.id
                          ? answer.color + " text-white hover:opacity-90"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => handleAnswerSelect(answer.id)}
                      disabled={showResult}
                    >
                      {answer.label}
                    </Button>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  {!showResult ? (
                    <Button
                      onClick={handleCheckAnswer}
                      disabled={!selectedAnswer}
                      className="bg-green-600 hover:bg-green-700 text-white px-8"
                    >
                      Check Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-secondary hover:bg-secondary/90 px-8"
                    >
                      Another Question
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Result Message */}
            {showResult && (
              <Card
                className={`${
                  selectedAnswer === exercise.correctAnswer
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-3">
                    {selectedAnswer === exercise.correctAnswer ? (
                      <>
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <p className="text-lg font-semibold text-green-600">
                          Correct! The answer is: {exercise.correctAnswer}
                        </p>
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </>
                    ) : (
                      <>
                        <XCircle className="h-6 w-6 text-red-600" />
                        <p className="text-lg font-semibold text-red-600">
                          Incorrect! The correct answer is:{" "}
                          {exercise.correctAnswer}
                        </p>
                        <XCircle className="h-6 w-6 text-red-600" />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
