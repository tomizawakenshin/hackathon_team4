import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { registerNewUser } from "./server/registerUser";

export function startWatchingAuthStateChange() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      registerNewUser(user.uid);
    }
  })
}
