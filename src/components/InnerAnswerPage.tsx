"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { submitAnswer } from "@/logics/server/submitAnswer";
import { auth } from "@/logics/firebase";
import { fetchQuizzes } from "@/logics/fetchQuiz";
import { fetchCurrentTeamId } from "@/logics/fetchCurrentTeam";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useFetchQuiz } from "@/hooks/useFetchQuiz";
import { getIndexParams } from "@/utils/getIndexParams";
import { fetchTeamById } from "@/logics/fetchTeams";
import { turnOnQuizCompletedFlag } from "@/logics/server/turnOnQuizCompletedFlag";
import TeamHeader from "./TeamHeader";
import QuizQuestion from "./QuizQuestion";
import QuizOptions from "./QuizOptions";
import SubmitButton from "./SubmitButton";
import quizOptionsImage from "@/assets/images/quiz-options.png";
import bgImage from "@/assets/images/bg-answerPage.jpg";

const InnerAnswerPage: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const quizIndex = getIndexParams();
  const quiz = useFetchQuiz(quizIndex);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [teamName, setTeamName] = useState<string>("");
  useDisableScroll();

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
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-green-300 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <TeamHeader teamName={teamName} imageSrc={quizOptionsImage.src} />
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
    </div>
  );
};

export default InnerAnswerPage;
