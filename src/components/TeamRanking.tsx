import { useContainerVariants, useItemVariants } from "@/hooks/useAnimation";
import { getColorClass } from "@/utils/getColorClass";
import { motion } from "framer-motion";

interface Team {
  name: string;
  matchRate: number;
}

interface TeamRankingProps {
  teams: Team[];
  maxMatchRate: number;
}

const TeamRanking: React.FC<TeamRankingProps> = ({ teams, maxMatchRate }) => {
  const containerVariants = useContainerVariants();

  return (
    <motion.div
      className="flex w-full flex-col gap-1 border-l-8 border-black py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {teams.map((team, index) => {
        const width = `${team.matchRate}%`;
        const delay = (teams.length - 1 - index) * 0.2;
        const itemVariants = useItemVariants(width);

        return (
          <motion.div
            key={team.name}
            className="relative mb-2 flex items-center"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 1, delay }}
            style={{ width }}
          >
            <div
              className={`flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap px-4 py-2 font-bold text-white ${getColorClass(index)}`}
            >
              {team.name}
            </div>
            <div className="rotate-90 text-xs font-bold text-gray-500">{Math.round(team.matchRate)}%</div>
            {team.matchRate === maxMatchRate && (
              <div className="bg-transparent font-mono text-xl font-bold text-yellow-300">👑</div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TeamRanking;
