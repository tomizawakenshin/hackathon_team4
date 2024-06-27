import bgImage from "@/assets/images/bg-resultPage.jpg";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useFetchTeamsData } from "@/hooks/useFetchTeamsData";
// import useScoresSearchParams from "@/hooks/useScoresSearchParams";
import TeamRanking from "./TeamRanking";
import useScoresSearchParams from "@/hooks/useScoresSearchParams";

const InnerResultPage: React.FC = () => {
  const scores = useScoresSearchParams();

  const teams = useFetchTeamsData(scores);
  const sortedTeams = [...teams].sort((a, b) => b.matchRate - a.matchRate);
  const maxMatchRate = sortedTeams[0]?.matchRate;
  useDisableScroll();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-10"></div>
      <div className="z-10 flex flex-col items-center w-full max-w-2xl p-8">
        <h1 className="text-5xl font-bold text-orange-500">結果は...</h1>
        <TeamRanking teams={sortedTeams} maxMatchRate={maxMatchRate} />
      </div>
    </div>
  );
};

export default InnerResultPage;
