"use client";

import bgImage from "@/assets/images/bg-resultPage.jpg";
import TeamRanking from "@/components/TeamRanking";
import { useDisableScroll } from "@/hooks/useDisableScroll";

const ResultPage: React.FC = () => {
  const teams = [
    { name: "チーム1", correctRate: 30 },
    { name: "チーム2", correctRate: 80 },
    { name: "チーム3", correctRate: 70 },
    { name: "チーム4", correctRate: 90 },
    { name: "チーム5", correctRate: 45 },
    { name: "チーム6", correctRate: 30 },
    { name: "チーム7", correctRate: 45 },
    { name: "チーム8", correctRate: 50 },
    { name: "チーム9", correctRate: 36 },
    { name: "チーム10", correctRate: 34 },
  ];
  const sortedTeams = [...teams].sort((a, b) => b.correctRate - a.correctRate);
  const maxCorrectRate = sortedTeams[0].correctRate;
  useDisableScroll();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-10"></div>
      <div className="z-10 flex flex-col items-center w-full max-w-2xl p-8">
        <h1 className="text-5xl font-bold text-orange-500">結果は...</h1>
        <TeamRanking teams={sortedTeams} maxCorrectRate={maxCorrectRate} />
      </div>
    </div>
  );
};

export default ResultPage;
