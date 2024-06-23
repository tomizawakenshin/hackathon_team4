import { useEffect, useState } from "react";
import { fetchTeamById } from "@/logics/fetchTeams";
import { TeamScore } from "@/logics/totalScore";

interface TeamData {
  name: string;
  matchRate: number;
}

export const useFetchTeamsData = (scores: TeamScore[]) => {
  const [teams, setTeams] = useState<TeamData[]>([]);

  useEffect(() => {
    const fetchTeamsData = async () => {
      const teamsData = await Promise.all(
        scores.map(async (score) => {
          const team = await fetchTeamById(score.teamId);
          return { name: team.name, matchRate: (score.matchRate || 0) * 100 };
        })
      );
      setTeams(teamsData);
    };

    fetchTeamsData();
  }, []);

  return teams;
};
