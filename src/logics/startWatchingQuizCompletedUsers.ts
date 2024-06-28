import { QuerySnapshot, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { fetchUsers } from "./fetchUsers";
import { TeamScore, totalScore } from "./totalScore";
import { User } from "./types/user";

/**
 * クイズを全部完了したユーザの監視を開始します。全員がクイズを完了したら結果を集計してcallback関数に渡します。
 * callback関数にはresultページに遷移する処理などが渡されることを想定しています。
 * */
export function startWatchingQuizCompletedUsers(callback: (finalScores: TeamScore[]) => void) {
  const completedUsersRef = collection(db, "quizCompletedUsers");
  const unsubscribe = onSnapshot(completedUsersRef, async (completedUsersSnapshot) => {
    const users = await fetchUsers();
    const areAllUsersCompleted = checkIfAllUsersCompletedQuizzes(completedUsersSnapshot, users);
    if (!areAllUsersCompleted) return;
    const finalScores = await totalScore();
    callback(finalScores);
  });
  return unsubscribe;
}

function checkIfAllUsersCompletedQuizzes(completedUsersSnapshot: QuerySnapshot, users: User[]) {
  const completedUserDocs = completedUsersSnapshot.docs;
  const completedUserIds = completedUserDocs.map((completedUserDoc) => completedUserDoc.id);

  let areAllUsersCompleted = 1;
  users.forEach((user) => {
    if (!completedUserIds.includes(user.id) && user.teamId != undefined) areAllUsersCompleted *= 0;
  });

  return areAllUsersCompleted == 1
}
