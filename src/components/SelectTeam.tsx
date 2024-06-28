import TeamButtons from "@/components/TeamButtons";
import { fetchTeams } from "@/logics/fetchTeams";
import { startWatchingAuthStateChange } from "@/logics/startWatchingAuthStateChange";
import { Team } from "@/logics/types/team";
import { useEffect, useState } from "react";
import teamselecttop from "@/assets/images/teamselecttop.png";
import entry from "@/assets/images/entry.png";
import Image from "next/image";

const SelectTeamPanel = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchTeams().then((teams) => setTeams(teams));
    const unsubscribe = startWatchingAuthStateChange();
    return unsubscribe;
  }, []);
  return (
    <div className="bg-green-300 h-screen w-screen text-center">
      <div className="h-[20vh] bg-yellow-300">
        <h1 className="text-4xl text-block font-mono h-[20vh] flex justify-center items-center">
          <Image
            src={teamselecttop}
            alt="チームをセレクト"
            className="w-[70vw] max-w-xs"
          />
        </h1>
      </div>
      <div className="flex items-center justify-center p-4 border-white bottom-1">
        <Image src={entry} alt="ENTRY" className="w-[60vw] max-w-xs" />
      </div>
      <div className="px-4">
        <TeamButtons teams={teams} />
      </div>
    </div>
  );
};

export default SelectTeamPanel;
