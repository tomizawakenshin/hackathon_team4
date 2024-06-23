import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Team } from "./types/team";

/** 現在のチーム一覧を返します。 */
export async function fetchTeams(): Promise<Team[]> {
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

/** 渡されたチームIDのチームを取得して返します。現在のユーザのチームのIDは`fetchCurrentTeamId`で取得できます。*/
export async function fetchTeamById(teamId: string): Promise<Team> {
  const teamRef = doc(db, "teams", teamId);
  const teamSnapshot = await getDoc(teamRef);
  if (!teamSnapshot.exists) throw new ReferenceError("Team does not exist on database");

  const teamData = teamSnapshot.data();
  if (teamData == undefined) throw new ReferenceError("Team data does not exist on database");

  const name = teamData.name;
  if (name == undefined) throw new ReferenceError("Team name does not exist on database");

  return {
    name: name,
    id: teamId
  }
}
