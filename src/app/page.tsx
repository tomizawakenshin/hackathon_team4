"use client";

import TeamButtons from "@/components/TeamButtons";
import { signInWithAnonymous } from "@/logics/SignInWithAnonymous";
import { fetchTeams } from "@/logics/fetchTeams";
import { auth } from "@/logics/firebase";
import { Team } from "@/logics/types/team";
import { startWatchingAuthStateChange } from "@/logics/startWatchingAuthStateChange";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchTeams().then((teams) => setTeams(teams));
    startWatchingAuthStateChange();
  }, []);

  return (
    <div>
      {user ? (
        <div className="text-center">
          チームをセレクト
          <div>
            <TeamButtons teams={teams} />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div>管理画面</div>
          <button onClick={signInWithAnonymous}>ゲームを開始</button>
        </div>
      )}
    </div>
  );
}
