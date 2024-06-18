"use client";

import { getAuth, onAuthStateChanged, signInAnonymously, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react";

export default function Admin() {
  const [user] = useAuthState(auth);
  const [teamsCount, setTeamsCount] = useState(0);

  useEffect(() => {
    const fetchTeamsCount = async () => {
      try {
        const teamsCollection = collection(db, 'Teams');
        const TeamsSnapShot = await getDocs(teamsCollection);
        setTeamsCount(TeamsSnapShot.size);
      } catch (err) {
        console.log(err);
      }
    }

    fetchTeamsCount();
  }, [])

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

  const JoinTeam = async () => {
    try {

      const docRef = await addDoc(collection(db, "Teams/team1/Member"), {
        user_id: `${user?.uid}`

      });
    } catch (err) {
      console.log("エラーを検知しました", err);
    }
  }

  return (
    <div>
      {user ? (
        <div>
          すでにログインしています！
          <div className="space-x-10 m-10">
            <button
              className="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded-full
          "
              onClick={JoinTeam}
            >
              team-1
            </button>
            <button
              className="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded-full
        "
            >
              team-2
            </button>
          </div>
        </div>

      ) : (
        <div className="text-center">
          <div>管理画面</div>
          <button
            onClick={signInWithAnonymous}>
            ゲームを開始
          </button>
        </div>
      )}
    </div>
  )

}
