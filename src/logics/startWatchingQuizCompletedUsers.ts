import { QuerySnapshot, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { fetchUsers } from "./fetchUsers";
import { TeamScore, totalScore } from "./totalScore";
import { User } from "./types/user";

/** クイズを全部完了したユーザの監視を開始します。*/
export function startWatchingQuizCompletedUsers(callback: (finalScores: TeamScore[]) => void) {
  const completedUsersRef = collection(db, "quizCompletedUsers");
  onSnapshot(completedUsersRef, async (completedUsersSnapshot) => {
    const users = await fetchUsers();
    const areAllUsersCompleted = checkIfAllUsersCompletedQuizzes(completedUsersSnapshot, users);
    if (!areAllUsersCompleted) return;
    const finalScores = await totalScore();
    callback(finalScores);
  });
}

function checkIfAllUsersCompletedQuizzes(completedUsersSnapshot: QuerySnapshot, users: User[]) {
  const completedUserDocs = completedUsersSnapshot.docs;
  const completedUserIds = completedUserDocs.map((completedUserDoc) => completedUserDoc.id);

  let areAllUsersCompleted = 1;
  users.forEach((user) => {
    if (!completedUserIds.includes(user.id)) areAllUsersCompleted *= 0;
  });

  return areAllUsersCompleted == 1
}
