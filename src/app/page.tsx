"use client";

import TeamButtons from "@/components/TeamButtons";
import { signInWithAnonymous } from "@/logics/SignInWithAnonymous";
import { fetchTeams } from "@/logics/fetchTeams";
import { auth } from "@/logics/firebase";
import { Team } from "@/logics/types/team";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    // firestoreから全チームを読み取ってパースしてteamsステートにセット
    fetchTeams().then((teamSnapshots) =>
      setTeams(
        teamSnapshots.map((teamSnapshot) => {
          const teamData = teamSnapshot.data();

          if (teamData.id == undefined) throw new ReferenceError("Id does not exist on database");
          if (teamData.name == undefined) throw new ReferenceError("Name does not exist on database");

          return {
            id: teamData.id,
            name: teamData.name,
          };
        })
      )
    );
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
