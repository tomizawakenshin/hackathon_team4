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
      className="flex flex-col gap-1 w-full border-l-8 border-black py-6"
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
            className="flex items-center mb-2 relative"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 1, delay }}
            style={{ width }}
          >
            <div
              className={`flex-1 py-2 px-4 font-bold text-white ${getColorClass(index)}`}
            >
              {team.name}
            </div>
            {team.matchRate === maxMatchRate && (
              <div
                className="absolute text-yellow-300 font-mono font-bold text-2xl bg-transparent"
                style={{ left: `calc(${team.matchRate * 0.7}% + 30px)` }}
              >
                WIN
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TeamRanking;
