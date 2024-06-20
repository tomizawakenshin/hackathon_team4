"use client";

import TeamButtons from "@/components/TeamButtons";
import TeamCard from "@/components/TeamCard";
import { fetchTeamsCount } from "@/logics/CountTheNumberOfTeams";
import { signInWithAnonymous } from "@/logics/SignInWithAnonymous";
import { auth, db } from "@/logics/firebase";
import { Team } from "@/logics/types/team";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  const [teamsCount, setTeamsCount] = useState(0);

  const [teams, setTeams] = useState<Team[]>([
    { name: "Team1", id: "1" },
    { name: "Team2", id: "2" },
    { name: "Team3", id: "3" },
    { name: "Team4", id: "4" },
  ]);

  const router = useRouter();

  const teamCards = teams.map((team) => <TeamCard key={team.id} router={router}>{team.name}</TeamCard>);

  useEffect(() => {
    const getTeamsCount = async () => {
      const count = await fetchTeamsCount();
      if (count != undefined) {
        setTeamsCount(count);
      }
    }
    getTeamsCount();
  }, [])

  // function gameStartButtonHandler() {
  //   signInWithAnonymous
  // }

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
