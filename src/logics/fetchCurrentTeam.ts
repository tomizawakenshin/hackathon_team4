import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// ユーザの所属しているチームのIDを取得します。
export async function fetchCurrentTeamId(userId: string) {
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists) throw new ReferenceError("User does not exist");
  const userData = userSnapshot.data();
  if (userData == undefined) throw new ReferenceError("User data does not exist");
  const userTeam = userData.team;
  if (userTeam == undefined) throw new ReferenceError("User is not in team");
  if (typeof userTeam != "string") throw new Error("Invalid user team format");
  return userTeam;
}
