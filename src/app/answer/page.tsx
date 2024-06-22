"use client";

import { useEffect, useState } from "react";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { Quiz } from "@/logics/types/quiz";
import { submitAnswer } from "@/logics/server/submitAnswer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/logics/firebase";
import { fetchQuizByIndex, fetchQuizzes } from "@/logics/fetchQuiz";
import { fetchCurrentTeamId } from "@/logics/fetchCurrentTeam";

function getIndexParams(searchParams: ReadonlyURLSearchParams): number {
  const index = searchParams.get("index");
  if (index == null) throw new Error("Quiz index is not specified");
  const intIndex = parseInt(index);
  return intIndex;
}

// クイズのインデックスをクエリパラメータで受け取って、対応するクイズの回答画面を表示します。
const AnswerPage: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const searchParams = useSearchParams();
  const quizIndex = getIndexParams(searchParams);

  const [quiz, setQuiz] = useState<Quiz>({
    id: "",
    teamId: "",
    question: "",
    options: [],
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const buttonColors = ["bg-blue-300", "bg-red-300", "bg-yellow-300", "bg-purple-300"];

  useEffect(() => {
    fetchQuizByIndex(quizIndex).then((quiz) => {
      setQuiz(quiz);
    });
  }, []);

  const handleSubmit = async () => {
    if (user == undefined || null) throw new Error("You are not logged in!");
    if (selectedOption == null) throw new Error("No option is selected");
    if (quiz == undefined) throw new Error("Quiz is not fetched yet");

    const currentTeamId = await fetchCurrentTeamId(user.uid);
    submitAnswer(quiz.id, currentTeamId, user.uid, selectedOption);
    if (quizIndex >= (await fetchQuizzes()).length) {
      router.push(`/waiting`);
    } else {
      router.push(`/answer?index=${quizIndex + 1}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-300 text-white">
      <h1 className="mbk6 text-2xl font-bold">問題！</h1>
      <p className="text-xl font-semibold">{quiz.question}</p>
      <div className="m-6 flex flex-col space-y-4">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => {setSelectedOption(index);}}
            className={`w-full min-w-32 rounded-lg px-2 py-2 font-semibold transition-transform duration-300 focus:outline-none ${buttonColors[index]} ${selectedOption === index ? "scale-90 transform" : "scale-100 transform"} `}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selectedOption == null}
        className={`mt-4 w-full max-w-28 rounded-full px-4 py-2 font-semibold text-white ${selectedOption == null ? "bg-gray-400" : "bg-red-300"}`}
      >
        回答！
      </button>
      <div>{user?.uid}</div>
    </div>
  );
};

export default AnswerPage;
