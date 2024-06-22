import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

/** 現在のチーム一覧を返します。 */
export async function fetchTeams() {
  const teamsRef = collection(db, "teams");
  const teamsSnapshot = await getDocs(teamsRef);
  return teamsSnapshot.docs;
}
