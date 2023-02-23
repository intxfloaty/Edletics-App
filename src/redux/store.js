import { createStore } from "redux";
import teamReducer from "./reducers/teamReducer";

const store = createStore(teamReducer);

export default store