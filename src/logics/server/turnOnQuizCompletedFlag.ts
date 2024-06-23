"use server"

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function turnOnQuizCompletedFlag(userId: string) {
  const flagRef = doc(db, "quizCompletedUsers", userId);
  setDoc(flagRef, {
    userId: userId,
  });
}
