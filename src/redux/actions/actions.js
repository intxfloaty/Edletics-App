import { SELECT_CURRENT_TEAM } from "../constants/constants";

export const selectMyCurrentTeam = (team) => {
  return {
    type:SELECT_CURRENT_TEAM,
    payload:team
  }
}