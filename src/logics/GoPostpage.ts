import { goToPage } from "@/logics/server/goToPage";
import { getFirstTeamMember } from "./getFirstMember";
import { fetchCurrentTeamId } from "./fetchCurrentTeam";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { startWatchingGameStart } from "./startWatchingGameStart";

export const subscribeToGameStartAndNavigate = (uid: string) => {
  return startWatchingGameStart(async () => {
    const FirstMember = await getFirstTeamMember(uid);
    const teamOfUserPostedQuiz = await checkIfTeamOfUserPostedQuiz(uid);
    if (FirstMember === uid && !teamOfUserPostedQuiz) {
      goToPage('/post');
    }
  });
};

async function checkIfTeamOfUserPostedQuiz(userId: string) {
  const currentTeamId = await fetchCurrentTeamId(userId);
  const teamIdsOfPostedTeams = await fetchIdsOfQuizPostedTeams();
  return teamIdsOfPostedTeams.includes(currentTeamId);
}

async function fetchIdsOfQuizPostedTeams() {
  const postedTeamsRef = collection(db, "quizPostedTeams");
  const postedTeamDocs = (await getDocs(postedTeamsRef)).docs;
  const teamIdsOfPostedTeams = postedTeamDocs.map((postedTeamDoc) => postedTeamDoc.id);
  return teamIdsOfPostedTeams;
}
