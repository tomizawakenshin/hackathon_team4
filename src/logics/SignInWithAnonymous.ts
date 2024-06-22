import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";

export const signInWithAnonymous = () => {
  signInAnonymously(auth)
    .then(
      () => {
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
