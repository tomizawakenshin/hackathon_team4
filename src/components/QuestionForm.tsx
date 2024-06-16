"use client";

import { useState } from "react";
import QuestionInput from "./QuestionInput";
import AnswerList from "./AnswerList";
import SubmitButton from "./SubmitButton";

const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(question, answers);
    // 投稿処理を書く
  };

  return (
    <form className="w-full max-w-xs mt-5" onSubmit={handleSubmit}>
      <QuestionInput question={question} setQuestion={setQuestion} />
      <AnswerList answers={answers} handleAnswerChange={handleAnswerChange} />
      <SubmitButton />
    </form>
  );
};

export default QuestionForm;