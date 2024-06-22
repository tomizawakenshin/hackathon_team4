import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";
import { registerNewUser } from "./server/registerUser";

export const signInWithAnonymous = () => {
  signInAnonymously(auth)
    .then(
      (credential) => {
        registerNewUser(credential.user.uid);
        console.log("匿名でサインインしました");
      },
      (reason) => {
        console.error("匿名サインインが拒否されました：", reason);
      }
    )
    .catch((error) => {
      console.error("匿名サインイン中にエラーが発生しました: ", error);
    });
};
