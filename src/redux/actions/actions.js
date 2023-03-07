import { SELECT_CURRENT_TEAM, SELECT_CURRENT_GAME } from "../constants/constants";

export const selectMyCurrentTeam = (team) => {
  return {
    type: SELECT_CURRENT_TEAM,
    payload: team
  }
}

export const selectMyCurrentGame = (game) => {
  return {
    type: SELECT_CURRENT_GAME,
    payload: game
  }
}