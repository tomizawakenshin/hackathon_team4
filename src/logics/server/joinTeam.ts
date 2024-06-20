"use server"

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function joinTeam (teamId: string, uid: string) {
  try {
    const newMemberRef = doc(db, "teams", teamId, "members", uid);
    await setDoc(newMemberRef, {
      uid: uid
    })
  } catch (err) {
    console.log("エラーを検知しました", err);
  }
}
