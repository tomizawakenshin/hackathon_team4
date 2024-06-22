"use server";

import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function submitAnswer(quizId: string, userId: string, teamId: string, answerNumber: number) {
  const answersRef = collection(db, "quizzes", quizId, "answers");
  try {
    const newAnswerRef = doc(answersRef)
    await setDoc(newAnswerRef, {
      answerId: newAnswerRef.id,
      userId: userId,
      teamId: teamId,
      answerNumber: answerNumber,
    });
  } catch {
    throw new Error("Failed to submit answer");
  }
}
