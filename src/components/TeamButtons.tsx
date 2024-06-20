import { auth, db } from '@/logics/firebase';
import { goToPage } from '@/logics/goToPage';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

interface teamsCountProps {
    teamsCount: number;
}
const TeamButtons = ({ teamsCount }: teamsCountProps) => {
    const [user] = useAuthState(auth);
    const JoinTeam = async (teamNum: Number) => {
        try {
            const docRef = await addDoc(collection(db, `Teams/team${teamNum}/Member`), {
                user_id: `${user?.uid}`
            });
        } catch (err) {
            console.log("エラーを検知しました", err);
        }
    }

    const renderButtons = () => {
        return Array.from({ length: teamsCount }).map((_, index) => (
            <button
                key={index}
                className="
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              px-4
              rounded-full
            "
                onClick={() => {
                    JoinTeam(index + 1)
                    goToPage('/waiting')
                }}
            >
                team-{index + 1}
            </button>
        ))
    }
    return (
        <div>{renderButtons()}</div>
    )
}

export default TeamButtons
