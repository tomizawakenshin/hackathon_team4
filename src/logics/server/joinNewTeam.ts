"use server"

import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function joinNewTeam (name: string, uid: string) {
  try {
    const teamsRef = collection(db, "teams");
    const newTeamRef = doc(teamsRef);
    await setDoc(newTeamRef, {
      id: newTeamRef.id,
      name: name,
    })
    const newMemberRef = doc(db, "teams", newTeamRef.id, "members", uid)
    await setDoc(newMemberRef, {
      uid: uid
    })
  } catch (err) {
    console.log("エラーを検知しました", err);
  }
}
