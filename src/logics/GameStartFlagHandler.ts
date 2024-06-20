'use server'

import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebase"

export const StartGame = async () => {
    const flagsDocRef = doc(db, 'Flags', 'flags');
    try {
        const flagsDoc = await getDoc(flagsDocRef);
        if (flagsDoc.exists()) {
            const currentFlagStatus = flagsDoc.data().isGameStart;
            await updateDoc(flagsDocRef, {
                isGameStart: !currentFlagStatus
            });

        }
        console.log("Game started successfully");
    } catch (err) {
        console.error("Error starting game: ", err);
    }
}