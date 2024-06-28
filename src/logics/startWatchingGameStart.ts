import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export function startWatchingGameStart(callback: () => void) {
  const flagsRef = doc(db, "flags", "flags");
  const unsubscribe = onSnapshot(flagsRef, (flagsSnapshot) => {
    console.log("startWatchingGameStart:flags doc has changed!")
    const flagsData = flagsSnapshot.data();
    if (flagsData == undefined) throw new ReferenceError("flags collection does not have any data");
    if (flagsData.isGameStart == undefined) return;
    if (flagsData.isGameStart == false) return;
    if (flagsData.isGameStart == true) {
      callback();
    }
  });
  return unsubscribe;
}
