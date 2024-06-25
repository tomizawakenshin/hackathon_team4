"use client";

import QuestionInput from "@/components/QuestionInput";
import AnswerList from "@/components/AnswerList";
import SubmitButton from "@/components/SubmitButton";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/logics/firebase";
import { submitQuiz } from "@/logics/submitQuiz";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { fetchCurrentTeamId } from "@/logics/fetchCurrentTeam";
import { fetchTeamById } from "@/logics/fetchTeams";
import TeamHeader from "@/components/TeamHeader";
import bgImage from "@/assets/images/bg-postPage.jpg";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [teamName, setTeamName] = useState<string>("");
  useDisableScroll();

  useEffect(() => {
    // チーム名を取得する
    const fetchTeamName = async () => {
      if (user) {
        const teamId = await fetchCurrentTeamId(user.uid);
        const team = await fetchTeamById(teamId);
        setTeamName(team.name);
      }
    };
    fetchTeamName();
  }, [user]);

  useEffect(() => {
    // フォームのバリデーションを行う
    const isQuestionValid = question.trim().length > 0;
    const areAnswersValid = answers.every((answer) => answer.trim().length > 0);
    setIsFormValid(isQuestionValid && areAnswersValid);
  }, [question, answers]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(question, answers);
    // 投稿処理を書く
    await submitQuiz(user, question, answers);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen pt-14 text-center bg-blue-300 text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <TeamHeader teamName={teamName} />
      <form className="w-full max-w-80 mt-5" onSubmit={handleSubmit}>
        <QuestionInput question={question} setQuestion={setQuestion} />
        <AnswerList answers={answers} handleAnswerChange={handleAnswerChange} />
        <SubmitButton isFormValid={isFormValid} buttonText="出題!" />
      </form>
    </div>
  );
};

export default PostPage;
