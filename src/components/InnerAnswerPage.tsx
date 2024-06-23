"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { submitAnswer } from "@/logics/server/submitAnswer";
import { auth } from "@/logics/firebase";
import { fetchQuizzes } from "@/logics/fetchQuiz";
import { fetchCurrentTeamId } from "@/logics/fetchCurrentTeam";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useFetchQuiz } from "@/hooks/useFetchQuiz";
import { getIndexParams } from "@/utils/getIndexParams";
import QuizQuestion from "./QuizQuestion";
import QuizOptions from "./QuizOptions";
import SubmitButton from "./SubmitButton";
import { turnOnQuizCompletedFlag } from "@/logics/server/turnOnQuizCompletedFlag";

const InnerAnswerPage: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const quizIndex = getIndexParams();
  const quiz = useFetchQuiz(quizIndex);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  useDisableScroll();

  const handleSubmit = async () => {
    if (user == undefined || null) throw new Error("You are not logged in!");
    if (selectedOption == null) throw new Error("No option is selected");
    if (quiz == undefined) throw new Error("Quiz is not fetched yet");

    const currentTeamId = await fetchCurrentTeamId(user.uid);
    submitAnswer(quiz.id, currentTeamId, user.uid, selectedOption);
    if (quizIndex >= (await fetchQuizzes()).length - 1) {
      router.push(`/result-waiting`);
    } else {
      turnOnQuizCompletedFlag(user.uid);
      router.push(`/answer?index=${quizIndex + 1}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-300 text-white">
      <QuizQuestion question={quiz.question} />
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
