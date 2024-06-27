"use server"

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function turnOnIsGameStartFlag() {
  const isGameStartRef = doc(db, "flags", "flags");
  await setDoc(isGameStartRef, {
    isGameStart: true
  });
}
export async function turnOffIsGameStartFlag() {
  const isGameStartRef = doc(db, "flags", "flags");
  await setDoc(isGameStartRef, {
    isGameStart: false
  });
}
