import { Team } from "./types/team";

let currentTeam: Team;

export function getTeam() {
  return currentTeam;
}

export function setTeam(team: Team) {
  currentTeam = team;
}
