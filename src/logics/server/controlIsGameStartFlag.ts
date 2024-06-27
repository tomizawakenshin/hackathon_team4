"use server"

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function turnOnIsGameStartFlag() {
  console.log("turnOnIsGameStartFlag: function called")
  const isGameStartRef = doc(db, "flags", "flags");
  await setDoc(isGameStartRef, {
    isGameStart: true
  });
}
export async function turnOffIsGameStartFlag() {
  console.log("turnOffIsGameStartFlag: function called")
  const isGameStartRef = doc(db, "flags", "flags");
  await setDoc(isGameStartRef, {
    isGameStart: false
  });
}
