"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { submitAnswer } from "@/logics/server/submitAnswer";
import { auth } from "@/logics/firebase";
import { fetchQuizzes } from "@/logics/fetchQuiz";
import { fetchCurrentTeamId } from "@/logics/fetchCurrentTeam";
import { useFetchQuiz } from "@/hooks/useFetchQuiz";
import { getIndexParams } from "@/utils/getIndexParams";
import { fetchTeamById } from "@/logics/fetchTeams";
import { turnOnQuizCompletedFlag } from "@/logics/server/turnOnQuizCompletedFlag";
import QuizOptions from "./QuizOptions";
import SubmitButton from "./SubmitButton";
import quizOptionsImage from "@/assets/images/quiz-options.png";

const InnerAnswerPage: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const quizIndex = getIndexParams();
  const quiz = useFetchQuiz(quizIndex);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [teamName, setTeamName] = useState<string>("");

  useEffect(() => {
    setSelectedOption(null);
    if (quiz && quiz.teamId) {
      fetchTeamById(quiz.teamId)
        .then((team) => {
          setTeamName(team.name);
        })
        .catch((error) => {
          console.error("Failed to fetch team name: ", error);
        });
    }
  }, [quiz]);

  const handleSubmit = async () => {
    if (user == undefined || null) throw new Error("You are not logged in!");
    if (selectedOption == null) throw new Error("No option is selected");
    if (quiz == undefined) throw new Error("Quiz is not fetched yet");

    const currentTeamId = await fetchCurrentTeamId(user.uid);
    submitAnswer(quiz.id, user.uid, currentTeamId, selectedOption);
    if (quizIndex >= (await fetchQuizzes()).length - 1) {
      await turnOnQuizCompletedFlag(user.uid);
      router.push(`/result-waiting`);
    } else {
      router.push(`/answer?index=${quizIndex + 1}`);
    }
  };

  return (
    <div className="z-0 bg-green-300 text-center text-white">
      <div className="flex h-36 w-36 items-center justify-center bg-purple-300 font-bold [clip-path:polygon(20%_0,100%_20%,80%_100%,0_80%)]">
        「{teamName}」からの出題です！
      </div>
      <div className="absolute right-1 top-1 h-36 w-36">
        <img
          src={quizOptionsImage.src}
          alt=""
        />
      </div>
      <h1 className="mb-6 text-3xl font-bold">問題!</h1>
      <p className="text-xl font-semibold">{quiz.question}</p>
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
      <div className="h-32" />
    </div>
  );
};

export default InnerAnswerPage;
