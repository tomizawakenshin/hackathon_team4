"use server"

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

/** ユーザがすべてのクイズに答え終わったことを送信します。firestore上の指定されたユーザのフラグがオンになります */
export async function turnOnQuizCompletedFlag(userId: string) {
  const flagRef = doc(db, "quizCompletedUsers", userId);
  await setDoc(flagRef, {
    userId: userId,
  });
}
