import { getColorClass } from "@/utils/getColorClass";

interface Team {
  name: string;
  correctRate: number;
}

interface TeamRankingProps {
  teams: Team[];
  maxCorrectRate: number;
}

const TeamRanking: React.FC<TeamRankingProps> = ({ teams, maxCorrectRate }) => {
  return (
    <div className="flex flex-col gap-1 w-full border-l-8 border-black py-6">
      {teams.map((team, index) => (
        <div
          key={team.name}
          className="flex items-center mb-2"
          style={{ width: `${team.correctRate}%` }}
        >
          <div
            className={`flex-1 py-2 px-4 font-bold text-white ${getColorClass(index)}`}
          >
            {team.name}
          </div>
          {team.correctRate === maxCorrectRate && (
            <div
              className="absolute left-60 ml-2 text-yellow-300 font-mono font-bold text-2xl bg-transparent"
              style={{ left: `${team.correctRate * 0.7}%` }}
            >
              WIN
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamRanking;
