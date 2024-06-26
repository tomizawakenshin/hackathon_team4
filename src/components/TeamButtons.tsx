import { auth } from "@/logics/firebase";
import { goToPage } from "@/logics/server/goToPage";
import { joinTeam } from "@/logics/server/joinTeam";
import { Team } from "@/logics/types/team";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import hukidashi from "@/assets/images/hukidashi.svg";



interface Props {
  teams: Team[];
}
const TeamButtons = (props: Props) => {
  const [user] = useAuthState(auth);

  function buttonClickHandler(team: Team) {
    if (user == undefined || null) throw new Error("user is not logged in");
    joinTeam(team.id, user.uid);
    console.log("log");
    goToPage('/waiting');
  }

  const buttons = props.teams.map((team) => (
    <button
      key={team.id}
      onClick={() => {
        buttonClickHandler(team);
      }}
      className="block bg-no-repeat bg-center py-4 pl-2 pr-4"
      style={{backgroundImage:`url(${hukidashi.src})`}}
    >
      {team.name}
    </button>
  ));

  return <div className="grid grid-cols-2 gap-4 text-2xl font-mono">{buttons}</div>;
};

export default TeamButtons;
