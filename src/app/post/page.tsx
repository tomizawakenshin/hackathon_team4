"use client";

import QuestionInput from "@/components/QuestionInput";
import AnswerList from "@/components/AnswerList";
import SubmitButton from "@/components/SubmitButton";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/logics/firebase";
import { fetchCurrentTeamId } from "@/logics/fetchCurrentTeam";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { submitQuiz } from "@/logics/submitQuiz";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // スクロールを禁止する
    document.body.style.overflow = "hidden";
    return () => {
      // クリーンアップ時に元に戻す
      document.body.style.overflow = "auto";
    };
  }, []);

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
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-blue-300 text-white">
      <form className="w-full max-w-80 mt-5" onSubmit={handleSubmit}>
        <QuestionInput question={question} setQuestion={setQuestion} />
        <AnswerList answers={answers} handleAnswerChange={handleAnswerChange} />
        <SubmitButton isFormValid={isFormValid} buttonText="出題!" />
      </form>
    </div>
  );
};

export default PostPage;
