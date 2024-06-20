import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchTeamsCount = async () => {
    try {
        const teamsCollection = collection(db, 'Teams');
        const TeamsSnapShot = await getDocs(teamsCollection);
        return TeamsSnapShot.size;
    } catch (err) {
        console.log(err);
        return undefined;
    }
}