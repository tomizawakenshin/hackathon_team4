import TeamButtons from "@/components/TeamButtons"
import { fetchTeams } from "@/logics/fetchTeams";
import { startWatchingAuthStateChange } from "@/logics/startWatchingAuthStateChange";
import { Team } from "@/logics/types/team";
import { useEffect, useState } from "react";

const page = () => {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        fetchTeams().then((teams) => setTeams(teams));
        startWatchingAuthStateChange();
    }, []);
    return (
        <div className="text-center">
            チームをセレクト
            <div>
                <TeamButtons teams={teams} />
            </div>
        </div>
    )
}

export default page