"use client";

import { useState } from "react";

const PostPage: React.FC = () => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-700">
      <h1 className="text-4xl font-bold ">問題を投稿</h1>
      <form className="w-full max-w-xs mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-xl" htmlFor="question">
            問題を入力してください:
          </label>
          <textarea
            id="question"
            className="p-2 mt-2 border border-gray-700 rounded-md resize-none w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="問題を入力してください"
          ></textarea>
        </div>
        <div className="flex flex-col mt-5">
          <p className="text-xl">4つの回答を入力してください:</p>
          {answers.map((answer, index) => (
            <div key={index}>
              <input
                id={`answer${index}`}
                className="p-2 mt-2 border border-gray-700 h-10 rounded-md resize-none w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={answer}
                onChange={(e) => {
                  handleAnswerChange(index, e.target.value);
                }}
                placeholder={`回答${index + 1}を入力してください`}
              ></input>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 w-full max-w-40 px-4 py-2 text-white bg-blue-500 rounded"
          >
            投稿
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostPage;
