import { SELECT_CURRENT_TEAM } from "../constants/constants";

const initialState = {
  currentTeam: {}
}

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CURRENT_TEAM: return {
      ...state,
      currentTeam: action.payload
    }
    default: return state
  }
}

export default teamReducer