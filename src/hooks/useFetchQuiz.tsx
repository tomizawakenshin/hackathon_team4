import { useEffect, useState } from "react";
import { fetchQuizByIndex } from "@/logics/fetchQuiz";
import { Quiz } from "@/logics/types/quiz";

export const useFetchQuiz = (quizIndex: number) => {
  const [quiz, setQuiz] = useState<Quiz>({
    id: "",
    teamId: "",
    question: "",
    options: [],
  });

  useEffect(() => {
    fetchQuizByIndex(quizIndex).then((quiz) => {
      setQuiz(quiz);
    });
  }, [quizIndex]);

  return quiz;
};
