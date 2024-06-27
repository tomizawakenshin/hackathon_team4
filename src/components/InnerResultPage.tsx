import bgImage from "@/assets/images/bg-resultPage.jpg";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useFetchTeamsData } from "@/hooks/useFetchTeamsData";
import TeamRanking from "./TeamRanking";
import useScoresSearchParams from "@/hooks/useScoresSearchParams";
import { TeamScore } from "@/logics/totalScore";

const InnerResultPage: React.FC = () => {
  const scores = useScoresSearchParams();

  const teams = useFetchTeamsData(scores);
  const sortedTeams = [...teams].sort((a, b) => b.matchRate - a.matchRate);
  const maxMatchRate = sortedTeams[0]?.matchRate;
  useDisableScroll();

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="absolute left-0 top-0 h-full w-full bg-white bg-opacity-10"></div>
      <div className="z-10 flex w-full max-w-2xl flex-col items-center p-8">
        <h1 className="text-5xl font-bold text-orange-500">結果は...</h1>
        <TeamRanking
          teams={sortedTeams}
          maxMatchRate={maxMatchRate}
        />
      </div>
    </div>
  );
};

export default InnerResultPage;
