"use server"

import { doc, setDoc } from "firebase/firestore";
import { User } from "../types/user";
import { db } from "../firebase";

// Firestoreにユーザの情報を登録します。引数にUser型のオブジェクトを受け取ります。
export async function registerUser(user: User) {
  const userRef = doc(db, "users", user.id);
  await setDoc(userRef, {
    id: user.id,
    teamId: user.teamId,
  });
}

// Firestoreにユーザの情報を登録します。引数にはユーザIDを受け取ります。
export async function registerNewUser(id: string) {
  const userRef = doc(db, "users", id);
  await setDoc(userRef, { id: id });
}

// Firestoreのユーザ情報にチームIDを登録します。ユーザをチームに追加したいときはこれではなくjoinTeamを使ってください。
export async function registerTeamToFirestore(userId: string, teamId: string) {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { teamId: teamId }, { merge: true });
}
