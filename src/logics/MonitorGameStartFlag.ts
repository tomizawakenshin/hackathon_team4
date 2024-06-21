//'use server'
//サーバー側で処理できないタイプのやつです

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export const listenToGameStart = (callback: any) => {
    return onSnapshot(doc(db, 'Flags', 'flags'), (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            if (data.isGameStart) {
                console.log("Flag is changed!");
                callback();
            }
        } else {
            console.log("No such document!");
        }
    });
}