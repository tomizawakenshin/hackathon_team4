import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { Team } from "./types/team";
import { fetchTeams } from "./fetchTeams";

export async function startWatchingQuizPostedTeams(callback: () => void) {
  const quizPostedTeamsRef = collection(db, "quizPostedTeams");
  onSnapshot(quizPostedTeamsRef, async (quizPostedTeamsSnapshot) => {
    const quizPostedTeamIds = quizPostedTeamsSnapshot.docs.map((doc) => doc.id);
    const teams = await fetchTeams();
    const areAllTeamsPostedQuiz = checkIfAllTeamsPostedQuiz(teams, quizPostedTeamIds);
    if (areAllTeamsPostedQuiz) callback();
  });
}

export function checkIfAllTeamsPostedQuiz(teams: Team[], quizPostedTeamIds: string[]) {
  let areAllTeamsPostedQuiz = 1;
  teams.forEach((team) => {
    if (!quizPostedTeamIds.includes(team.id)) areAllTeamsPostedQuiz *= 0;
  });
  return areAllTeamsPostedQuiz == 1;
}
