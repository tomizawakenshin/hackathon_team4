import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { User } from "./types/user";

/** 現在のユーザ一覧を返します。 */
export async function fetchUsers() {
  const usersRef = collection(db, "users");
  const usersSnapshot = await getDocs(usersRef);
  const users = usersSnapshot.docs.map((userSnapshot): User => {
    const userData = userSnapshot.data();
    if (userData.id == undefined) throw new ReferenceError("User id is not set");
    return {
      id: userData.id,
      teamId: userData.teamId,
    };
  });
  return users;
}
