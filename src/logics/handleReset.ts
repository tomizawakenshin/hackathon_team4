'use server';

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { turnOffIsGameStartFlag } from "./server/controlIsGameStartFlag";

/** DBを一番デフォルトの状態に戻す処理が書かれています */
export const handleReset = async () => {
    try {
        //quizPostedTeamsのドキュメントをすべて消去する
        const quizPostedTeamsCollectionRef = collection(db, 'quizPostedTeams');
        const quizPostedTeamsSnapShot = await getDocs(quizPostedTeamsCollectionRef);
        const deleteQuizPostedTeams = quizPostedTeamsSnapShot.docs.map((docSnapshot) =>
            deleteDoc(doc(db, 'quizPostedTeams', docSnapshot.id))
        );
        await Promise.all(deleteQuizPostedTeams);

        //quizCompletedUsersのドキュメントをすべて消去する
        const quizCompletedUsersRef = collection(db, 'quizCompletedUsers');
        const quizCompletedUsersSnapShot = await getDocs(quizCompletedUsersRef);
        const deleteQuizCompletedUsers = quizCompletedUsersSnapShot.docs.map((docSnapshot) =>
            deleteDoc(doc(db, 'quizCompletedUsers', docSnapshot.id))
        );
        await Promise.all(deleteQuizCompletedUsers);

        //quizzesのドキュメントをすべて削除する
        const quizzesCollectionRef = collection(db, 'quizzes');
        const quizzesSnapshot = await getDocs(quizzesCollectionRef);
        const deleteQuizzesPromise = quizzesSnapshot.docs.map(async (docSnapshot) => {
            const answerCollectionRef = collection(db, "quizzes", docSnapshot.id, "answers");

            const answerSnapshot = await getDocs(answerCollectionRef);

            const answerDeletePromise = answerSnapshot.docs.map((answerDoc) => {
                deleteDoc(doc(db, 'quizzes', docSnapshot.id, 'answers', answerDoc.id));
            })
            await Promise.all(answerDeletePromise);
            await deleteDoc(doc(db, 'quizzes', docSnapshot.id))
        }
        );

        await Promise.all(deleteQuizzesPromise);

        //teamsのmembersを削除する
        const teamsCollectionRef = collection(db, "teams");
        const teamsSnapshot = await getDocs(teamsCollectionRef);

        const teamDeletePromise = teamsSnapshot.docs.map(async (teamDoc) => {
            const membersCollectionRef = collection(db, 'teams', teamDoc.id, 'members');

            const membersSnapshot = await getDocs(membersCollectionRef);

            const memberDeletePromise = membersSnapshot.docs.map(async (memberDoc) => {
                deleteDoc(doc(db, 'teams', teamDoc.id, 'members', memberDoc.id));
            })

            await Promise.all(memberDeletePromise);
        })
        await Promise.all(teamDeletePromise);

        //usersのドキュメントを削除する
        const usersCollectionRef = collection(db, 'users');
        const usersSnapShot = await getDocs(usersCollectionRef);

        const deleteUsers = usersSnapShot.docs.map((docSnapshot) =>
            deleteDoc(doc(db, 'users', docSnapshot.id))
        );
        await Promise.all(deleteUsers);

        // isGameStartをリセット
        turnOffIsGameStartFlag();

        console.log('All documents have been deleted');
    } catch (error) {
        console.error('Error deleting documents: ', error);
    }
}
