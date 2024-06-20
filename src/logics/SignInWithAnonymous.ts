import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";

export const signInWithAnonymous = () => {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            signInAnonymously(auth)
                .then(() => {
                    console.log("匿名でサインインしました");
                })
                .catch((error) => {
                    console.error("匿名サインイン中にエラーが発生しました: ", error);
                });
        } else {
            console.log(user);
        }
    });
}