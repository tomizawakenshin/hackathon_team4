import { auth } from "@/logics/firebase";
import { joinTeam } from "@/logics/server/joinTeam";
import { Team } from "@/logics/types/team";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  teams: Team[];
}
const TeamButtons = (props: Props) => {
  // const JoinTeam = async (teamNum: Number) => {
  //   try {
  //     const docRef = await addDoc(collection(db, `Teams/team${teamNum}/Member`), {
  //       user_id: `${user?.uid}`,
  //     });
  //   } catch (err) {
  //     console.log("エラーを検知しました", err);
  //   }
  // };
  //
  // const renderButtons = () => {
  //   return Array.from({ length: teamsCount }).map((_, index) => (
  //     <button
  //       key={index}
  //       className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
  //       onClick={() => JoinTeam(index + 1)} // Adjust JoinTeam function as needed
  //     >
  //       team-{index + 1}
  //     </button>
  //   ));
  // };

  const [user] = useAuthState(auth);

  function buttonClickHandler(team: Team) {
    if (user == undefined || null) throw new Error("user is not logged in");
    joinTeam(team.id, user.uid);
    console.log("log");
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
