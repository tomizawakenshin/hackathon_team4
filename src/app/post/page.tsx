"use client";

import AnswerList from "@/components/AnswerList";
import QuestionInput from "@/components/QuestionInput";
import SubmitButton from "@/components/SubmitButton";
import { useEffect, useState } from "react";

const PostPage: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [isFormValid, setIsFormValid] = useState(false);

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
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-blue-300 text-white">
      <form className="w-full max-w-64 mt-5" onSubmit={handleSubmit}>
        <QuestionInput question={question} setQuestion={setQuestion} />
        <AnswerList answers={answers} handleAnswerChange={handleAnswerChange} />
        <SubmitButton
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
        />
      </form>
    </div>
  );
};

export default PostPage;
