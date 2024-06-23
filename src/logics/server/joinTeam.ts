"use server"

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { registerTeamToFirestore } from "./registerUser";

/** チームに参加します。teamドキュメントにuserIdを追加し、userドキュメントのteamIdフィールドを更新します。 */
export async function joinTeam(teamId: string, userId: string) {
  try {
    const newMemberRef = doc(db, "teams", teamId, "members", userId);
    await setDoc(newMemberRef, {
      uid: userId
    })
    registerTeamToFirestore(userId, teamId);
  } catch (err) {
    console.log("エラーを検知しました", err);
  }
}
