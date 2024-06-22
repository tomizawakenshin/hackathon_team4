"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Quiz } from "@/logics/types/quiz";
import { submitAnswer } from "@/logics/server/submitAnswer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/logics/firebase";
import { fetchQuizByIndex, fetchQuizzes } from "@/logics/fetchQuiz";
import { fetchCurrentTeamId } from "@/logics/fetchCurrentTeam";
import QuizOptions from "./QuizOptions";
import SubmitButton from "./SubmitButton";

const InnerAnswerPage: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const quizIndex = getIndexParams();

  const [quiz, setQuiz] = useState<Quiz>({
    id: "",
    teamId: "",
    question: "",
    options: [],
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    // スクロールを禁止する
    document.body.style.overflow = "hidden";
    return () => {
      // クリーンアップ時に元に戻す
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    fetchQuizByIndex(quizIndex).then((quiz) => {
      setQuiz(quiz);
    });
  }, [quizIndex]);

  function getIndexParams(): number {
    const searchParams = useSearchParams();
    const index = searchParams?.get("index");
    if (index == null) throw new Error("Quiz index is not specified");
    const intIndex = parseInt(index);
    return intIndex;
  }

  const handleSubmit = async () => {
    if (user == undefined || null) throw new Error("You are not logged in!");
    if (selectedOption == null) throw new Error("No option is selected");
    if (quiz == undefined) throw new Error("Quiz is not fetched yet");

    const currentTeamId = await fetchCurrentTeamId(user.uid);
    submitAnswer(quiz.id, currentTeamId, user.uid, selectedOption);
    if (quizIndex >= (await fetchQuizzes()).length - 1) {
      router.push(`/result-waiting`);
    } else {
      router.push(`/answer?index=${quizIndex + 1}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-300 text-white">
      <div className="text-center max-w-80">
        <h1 className="mb-6 text-3xl font-bold">問題!</h1>
        <p className="text-xl font-semibold">{quiz.question}</p>
      </div>
      <QuizOptions
        options={quiz.options}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <SubmitButton
        handleSubmit={handleSubmit}
        selectedOption={selectedOption}
        buttonText="回答!"
      />
      <div>{user?.uid}</div>
    </div>
  );
};

export default InnerAnswerPage;
