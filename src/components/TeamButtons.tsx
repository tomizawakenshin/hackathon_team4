import { auth } from "@/logics/firebase";
import { goToPage } from "@/logics/server/goToPage";
import { joinTeam } from "@/logics/server/joinTeam";
import { Team } from "@/logics/types/team";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import hukidashi from "@/assets/images/hukidashi.svg";
import { motion } from "framer-motion";

interface Props {
  teams: Team[];
}

const TeamButtons = (props: Props) => {
  const [user] = useAuthState(auth);

  function buttonClickHandler(team: Team) {
    if (user == undefined || null) throw new Error("user is not logged in");
    joinTeam(team.id, user.uid);
    console.log("log");
    goToPage("/waiting");
  }

  const buttons = props.teams.map((team, index) => (
    <motion.button
      key={team.id}
      onClick={() => {
        buttonClickHandler(team);
      }}
      className="bg-no-repeat bg-center py-4 pr-3 text-xl flex items-center justify-center transition-transform transform active:scale-95"
      style={{ backgroundImage: `url(${hukidashi.src})` }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.2 }}
    >
      {team.name}
    </motion.button>
  ));

  return (
    <div className="grid grid-cols-2 gap-y-4 text-2xl font-mono">{buttons}</div>
  );
};

export default TeamButtons;
