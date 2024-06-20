"use client";

import TeamButtons from "@/components/TeamButtons";
import { fetchTeamsCount } from "@/logics/CountTheNumberOfTeams";
import { signInWithAnonymous } from "@/logics/SignInWithAnonymous";
import { auth } from "@/logics/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  const [teamsCount, setTeamsCount] = useState(0);

  useEffect(() => {
    const getTeamsCount = async () => {
      const count = await fetchTeamsCount();
      if (count != undefined) {
        setTeamsCount(count);
      }
    }
    getTeamsCount();
  }, [])


  return (
    <div>
      {user ? (
        <div className="text-center">
          チームをセレクト
          <div>
            <TeamButtons teamsCount={teamsCount} />
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
  );
}
