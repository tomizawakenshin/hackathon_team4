import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { Team } from "./types/team";
import { fetchTeams } from "./fetchTeams";

export  function startWatchingQuizPostedTeams(callback: () => void) {
  const quizPostedTeamsRef = collection(db, "quizPostedTeams");

  const unsubscribe = onSnapshot(quizPostedTeamsRef, async (quizPostedTeamsSnapshot) => {
    console.log("startWatchingQuizPostedTeams: quizPostedTeams on firestore has changed!")

    const quizPostedTeamIds = quizPostedTeamsSnapshot.docs.map((doc) => doc.id);
    const teams = await fetchTeams();
    const areAllTeamsPostedQuiz = checkIfAllTeamsPostedQuiz(teams, quizPostedTeamIds);
    if (areAllTeamsPostedQuiz) callback();
  });

  return unsubscribe;
}

export function checkIfAllTeamsPostedQuiz(teams: Team[], quizPostedTeamIds: string[]) {
  let areAllTeamsPostedQuiz = 1;
  teams.forEach((team) => {
    if (!quizPostedTeamIds.includes(team.id)) areAllTeamsPostedQuiz *= 0;
  });
  return areAllTeamsPostedQuiz == 1;
}
