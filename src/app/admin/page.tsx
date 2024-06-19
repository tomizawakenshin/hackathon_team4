"use client";

import { getAuth, onAuthStateChanged, signInAnonymously, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react";
import { Game } from "@/logics/game";
import TeamButtons from "@/components/TeamButtons";

export default function Admin() {
  const [user] = useAuthState(auth);
  const [teamsCount, setTeamsCount] = useState(0);

  useEffect(() => {
    const fetchTeamsCount = async () => {
      try {
        const teamsCollection = collection(db, 'Teams');
        const TeamsSnapShot = await getDocs(teamsCollection);
        console.log(TeamsSnapShot.size);
        setTeamsCount(TeamsSnapShot.size);
      } catch (err) {
        console.log(err);
      }
    }

    fetchTeamsCount();
  }, [])

  function gameStart() {
    const game = Game.getInstance();
    game.start();

    console.log("Game Start!");
  }

  const signInWithAnonymous = () => {
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

  function gameStartButtonHandler() {
    signInWithAnonymous();
    gameStart();
  }

  return (
    <div>
      {user ? (
        <div className="text-center">
          チームをセレクト
          <div className="">
            <TeamButtons teamsCount={teamsCount} />
          </div>
        </div>

      ) : (
        <div className="text-center">
          <div>管理画面</div>
          <button
            onClick={gameStartButtonHandler}>
            ゲームを開始
          </button>
        </div>
      )}
    </div>
  );
}
      
// export default function Admin() {
// 
//   return (
//     <div className="text-center">
//       <div>管理画面</div>
//       <button onClick={gameStartButtonHandler}>ゲームを開始</button>
//     </div>
//   )
// 
// }
