"use client";

import QuestionInput from "@/components/QuestionInput";
import AnswerList from "@/components/AnswerList";
import SubmitButton from "@/components/SubmitButton";
import { useEffect, useState } from "react";
import { submitQuiz, submitQuizByTeamId } from "@/logics/submitQuiz";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import TeamHeader from "@/components/TeamHeader";
import bgImage from "@/assets/images/bg-postPage.jpg";
import { goToPage } from "@/logics/server/goToPage";


export default function AdminPost() {
  const [teamId, setTeamId] = useState("")
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  useDisableScroll();

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(question, answers);
    // 投稿処理を書く
    await submitQuizByTeamId(teamId, question, answers);
    setTeamId("");
    setQuestion("");
    setAnswers(["", "", "", ""])
  };

  const answerInputs = answers.map((answer, index) => (
    <div>
      選択肢{index + 1}: <input key={index} value={answer} onChange={(e) => handleAnswerChange(index, e.target.value)} className="border-2 mt-2" />
    </div>
  ))

  return (
    <div className="text-center my-6">
      <h2 className="font-bold">クイズ出題</h2>
      <form onSubmit={handleSubmit}>
        <div>
          チームID: <input value={teamId} onChange={(e) => setTeamId(e.target.value)} className="border-2 mt-2" />
        </div>
        <div>
          問題: <input value={question} onChange={(e) => setQuestion(e.target.value)} className="border-2 mt-2" />
        </div>
        <hr className="mt-2"/>
        {answerInputs}
        <button className="font-bold border-2 rounded-full shadow bg-white hover:bg-slate-100 active:bg-slate-200 px-4 py-1 mt-2">出題</button>
      </form>
    </div>
  );
};

