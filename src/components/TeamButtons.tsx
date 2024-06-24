import { auth } from "@/logics/firebase";
import { goToPage } from "@/logics/server/goToPage";
import { joinTeam } from "@/logics/server/joinTeam";
import { Team } from "@/logics/types/team";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";


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
      className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      {team.name}
    </button>
  ));

  return <div>{buttons}</div>;
};

export default TeamButtons;
