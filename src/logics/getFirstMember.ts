import { collection, getDocs } from "firebase/firestore";
import { fetchCurrentTeamId } from "./fetchCurrentTeam";
import { db } from "./firebase";

/** 与えられたユーザーのチームの一番上に登録されているユーザーIDを返します */
export const getFirstTeamMember = async (uid: string) => {

    const currentTeamID = await fetchCurrentTeamId(uid);

    const teamMembersRef = collection(db, `teams/${currentTeamID}/members`);
    const membersSnapShot = await getDocs(teamMembersRef);
    if (membersSnapShot) {
        return membersSnapShot.docs[0].id;
    } else {
        throw new ReferenceError('There are no member in this team!');
    }
}
