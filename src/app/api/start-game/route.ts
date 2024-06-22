import { db } from '@/logics/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
    const flagsDocRef = doc(db, 'Flags', 'flags');
    try {
        const flagsDoc = await getDoc(flagsDocRef);
        if (flagsDoc.exists()) {
            const currentFlagStatus = flagsDoc.data().isGameStart;
            await updateDoc(flagsDocRef, {
                isGameStart: !currentFlagStatus
            });

        }
        return NextResponse.json({ message: 'ゲームが開始されました' });
    } catch (err) {
        console.error(err);
        return NextResponse.json("Error occured!")
    }
}
