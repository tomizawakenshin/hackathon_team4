import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

/** ユーザの所属チームのIDを取得します。 チーム名などが必要な場合はこの関数で得たチームIDをfetchTeamByIdに渡してください。 */
export async function fetchCurrentTeamId(userId: string) {
  const userRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists) throw new ReferenceError("User does not exist");
  const userData = userSnapshot.data();
  if (userData == undefined) throw new ReferenceError("User data does not exist");
  const userTeam = userData.teamId;
  if (userTeam == undefined) throw new ReferenceError("User is not in team");
  if (typeof userTeam != "string") throw new Error("Invalid user team format");
  return userTeam;
}
