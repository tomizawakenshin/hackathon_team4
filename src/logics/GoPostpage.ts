import { goToPage } from "@/logics/server/goToPage";
import { handleStartGame } from "@/logics/FetchStartAPI";
import { listenToGameStart } from "@/logics/MonitorGameStartFlag";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

export const getFirstTeamMember = async (uid: string) => {
    const membersRef = collection(db, `teams/${uid}/members`);
    const q = query(membersRef, orderBy('__name__'), limit(1));
    const querySnapshot = await getDocs(q);
    console.log(q);
    //const firstDoc = querySnapshot.docs[0];

    // if (firstDoc) {
    //     return firstDoc.data();
    // } else {
    //     throw new Error('No documents found');
    // }
}
export const subscribeToGameStartAndNavigate = (uid: string) => {
    return listenToGameStart(async () => {
        //goToPage("/post");
        handleStartGame();
        //console.log(uid);
        const FirstUserName = await getFirstTeamMember(uid);
    });
};