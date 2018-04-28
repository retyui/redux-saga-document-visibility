import { combineReducers } from "redux";
import { messageReducer } from "../ducks/messages";
import { routerReducer } from "../ducks/router";

export const reducer = combineReducers({
	...routerReducer,
	...messageReducer
});
