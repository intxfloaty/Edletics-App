import { SELECT_CURRENT_TEAM, SELECT_CURRENT_GAME } from "../constants/constants";

const initialState = {
  currentTeam: {},
  currentGame: {}
}

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CURRENT_TEAM: return {
      ...state,
      currentTeam: action.payload
    }
    case SELECT_CURRENT_GAME: return {
      ...state,
      currentGame: action.payload
    }
    default: return state
  }
}

export default teamReducer