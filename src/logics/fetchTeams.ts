import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

/** 現在のチーム一覧を返します。 */
export async function fetchTeams() {
  const teamsRef = collection(db, "teams");
  const teamsSnapshot = await getDocs(teamsRef);
  const teams = teamsSnapshot.docs.map((teamSnapshot) => {
    const teamData = teamSnapshot.data();

    if (teamData.id == undefined) throw new ReferenceError("Id does not exist on database");
    if (teamData.name == undefined) throw new ReferenceError("Name does not exist on database");

    return {
      id: teamData.id,
      name: teamData.name,
    };
  });
  return teams;
}
