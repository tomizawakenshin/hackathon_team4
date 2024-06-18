"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AnswerPage: React.FC = () => {
  const router = useRouter();

  // 質問と回答は仮置き
  const [question, setQuestion] = useState("好きな季節は？");
  const [answers, setAnswers] = useState(["春", "夏", "秋", "冬"]);

  const buttonColors = [
    "bg-blue-300",
    "bg-red-300",
    "bg-yellow-300",
    "bg-purple-300",
  ];
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // 質問と回答を取得するロジックを追加
  }, []);

  const handleSubmit = async () => {
    setIsSubmitted(true);
    console.log(selectedAnswer);
    // 回答を送信するロジックを追加
    router.push("/result");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-300 text-white">
      <h1 className="mb-6 text-2xl font-bold">問題！</h1>
      <p className="text-xl font-semibold">{question}</p>
      <div className="flex flex-col m-6 space-y-4">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(answer)}
            className={`px-2 py-2 min-w-32 font-semibold rounded-lg w-full focus:outline-none transition-transform duration-300
            ${buttonColors[index]}
            ${
              selectedAnswer === answer
                ? "transform scale-90"
                : "transform scale-100"
            }
            `}
          >
            {answer}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer || isSubmitted}
        className={`mt-4 w-full max-w-28 px-4 py-2 font-semibold text-white rounded-full ${!selectedAnswer ? "bg-gray-400" : isSubmitted ? "bg-gray-400" : "bg-red-300"}`}
      >
        {isSubmitted ? "回答完了！" : "回答！"}
      </button>
    </div>
  );
};

export default AnswerPage;
