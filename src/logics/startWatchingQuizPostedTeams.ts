import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { Team } from "./types/team";
import { fetchTeams } from "./fetchTeams";

export async function startWatchingQuizPostedTeams(callback: () => void) {
  console.log("startWatchingQuizPostedTeams: function was called!")
  const quizPostedTeamsRef = collection(db, "quizPostedTeams");
  onSnapshot(quizPostedTeamsRef, async (quizPostedTeamsSnapshot) => {
    console.log("startWatchingQuizPostedTeams: quizPostedTeams on firestore has changed!")
    const quizPostedTeamIds = quizPostedTeamsSnapshot.docs.map((doc) => doc.id);
    const teams = await fetchTeams();
    const areAllTeamsPostedQuiz = checkIfAllTeamsPostedQuiz(teams, quizPostedTeamIds);
    if (areAllTeamsPostedQuiz) callback();
  });
}

export function checkIfAllTeamsPostedQuiz(teams: Team[], quizPostedTeamIds: string[]) {
  console.log(`checkIfAllTeamsPostedQuiz: passed quizPostedTeamIds: ${quizPostedTeamIds}`)
  console.log(quizPostedTeamIds)
  console.log(`checkIfAllTeamsPostedQuiz: passed teams: `)
  console.log(teams)
  let areAllTeamsPostedQuiz = 1;
  teams.forEach((team) => {
    if (!quizPostedTeamIds.includes(team.id)) areAllTeamsPostedQuiz *= 0;
    console.log(`checkIfAllTeamsPostedQuiz: iterating team id: `)
    console.log(team.id)
    console.log(`checkIfAllTeamsPostedQuiz: iterating team: `)
    console.log(team)
  });
  console.log(`checkIfAllTeamsPostedQuiz: areAllTeamsPostedQuiz: `)
  console.log(areAllTeamsPostedQuiz)
  return areAllTeamsPostedQuiz == 1;
}
