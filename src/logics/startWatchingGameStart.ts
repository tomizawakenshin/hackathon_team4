import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export function startWatchingGameStart(callback: () => void) {
  const flagsRef = doc(db, "flags", "flags");
  onSnapshot(flagsRef, (flagsSnapshot) => {
    const flagsData = flagsSnapshot.data();
    if (flagsData == undefined) throw new ReferenceError("flags collection does not have any data");
    if (flagsData.isGameStart == undefined) return;
    if (flagsData.isGameStart == false) return;
    if (flagsData.isGameStart == true) {
      callback();
    }
  })
}
