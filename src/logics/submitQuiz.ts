import { collection, doc, setDoc } from "firebase/firestore";
import { fetchCurrentTeamId } from "@/logics/fetchCurrentTeam";
import { db } from "@/logics/firebase";

export const submitQuiz = async (user: any, question: string, answers: string[]) => {
    if (!user?.uid) throw new ReferenceError("ユーザーIDが取得できませんでした。");


    try {
        const teamID = await fetchCurrentTeamId(user?.uid);
        const quizColRef = collection(db, "quizzes");
        const quizPostedTeamsColRef = collection(db, "quizPostedTeams");

        const quizzesDocRef = doc(quizColRef);
        const quizPostedTeamsDocRef = doc(quizPostedTeamsColRef, teamID);

        // setDocを使用してデータを設定
        await setDoc(quizzesDocRef, {
            id: quizzesDocRef.id, // 自動生成されたIDをデータに含める
            options: answers,
            question: question,
            teamId: teamID,
        });
        await setDoc(quizPostedTeamsDocRef, { teamId: teamID });
    } catch (error) {
        throw new ReferenceError(`Error adding quizzes Document: ${error}`);
    }
};
