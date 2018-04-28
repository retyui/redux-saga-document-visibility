import { cancel, fork, race, select, take , takeEvery, all} from "redux-saga/effects";
import { LOCATION_CHANGE } from "react-router-redux";

import {
	addItemToCollection,
	deleteItemInCollectionById,
	getCollectionReference
} from "../firebase/utils";
import { getRouterPathName } from "./router";
import { messagesPathname } from "../routs";

import { DOCUMENT_VISIBILITY_CHANGE } from "redux-saga-document-visibility";
import {
	createDeleteReqSaga,
	createRuntimeSyncSaga,
	createSaveRequestSaga
} from "../firebase/saga-utils";

//////////////////////////////////////////////////////////
// Contains
///
const moduleName = "messages";
const SAVE_MESSAGE_REQUEST = `${moduleName}/SAVE_MESSAGE_REQUEST`;
const SAVE_MESSAGE_SUCCESS = `${moduleName}/SAVE_MESSAGE_SUCCESS`;
const SAVE_MESSAGE_FAILURE = `${moduleName}/SAVE_MESSAGE_FAILURE`;
const DELETE_MESSAGE_REQUEST = `${moduleName}/DELETE_MESSAGE_REQUEST`;
const DELETE_MESSAGE_SUCCESS = `${moduleName}/DELETE_MESSAGE_SUCCESS`;
const DELETE_MESSAGE_FAILURE = `${moduleName}/DELETE_MESSAGE_FAILURE`;

//////////////////////////////////////////////////////////
// Action
//
export const shouldDeleteMessage = id => ({
	type: DELETE_MESSAGE_REQUEST,
	payload: id
});
export const shouldSaveMessage = text => ({
	type: SAVE_MESSAGE_REQUEST,
	payload: { text }
});

//////////////////////////////////////////////////////////
// Reducer
//
const initialState = {};
export const messageReducer = {
	[moduleName]: (state = initialState, action) => {
		switch (action.type) {
			case SAVE_MESSAGE_SUCCESS: return {
				...state,
				...action.payload
			};
			case DELETE_MESSAGE_SUCCESS: {
				const newState = {...state};
				delete newState[action.payload];
				return newState;
			}
			default:
				return state;
		}
	}
};

//////////////////////////////////////////////////////////
// API methods & Sagas
//

// api
const addMessage = addItemToCollection(moduleName);
const deleteMessage = deleteItemInCollectionById(moduleName);

// sagas
const deleteMessageSaga = createDeleteReqSaga(
	[DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_FAILURE],
	deleteMessage
);
const saveMessageSaga = createSaveRequestSaga(
	[SAVE_MESSAGE_SUCCESS, SAVE_MESSAGE_FAILURE],
	addMessage
);
const backgroundSync = createRuntimeSyncSaga(
	getCollectionReference(moduleName).orderBy("created", "asc"),
	{
		addType: SAVE_MESSAGE_SUCCESS,
		deleteType: DELETE_MESSAGE_SUCCESS
	}
);

function* cancellableSync() {
	let task = false;

	while (true) {
		// wait if router or visibilityState changed
		const [route, mySaga] = yield race([
			take(LOCATION_CHANGE),
			take(DOCUMENT_VISIBILITY_CHANGE)
		]);

		const pathname = route && route.payload && route.payload.pathname;
		const docVisibility = mySaga && mySaga.payload && mySaga.payload.visibility;

		if (process.env.NODE_ENV !== "production") {
			console.log(" --- ", {
				pathname,
				docVisibility
			});
		}
		/*
		* if
		*    changed route I check new `pathname === messagesPathname`
		*    or
		*    user open this tab `docVisibility === true`
		*                        and current pathname still
		*                       `pathname === messagesPathname`
		* else
		*    cancel backgroundSync saga
		* */

		if (
			pathname === messagesPathname ||
			(docVisibility === true &&
				(yield select(getRouterPathName)) === messagesPathname)
		) {
			task = yield fork(backgroundSync);
		} else if (task) {
			yield cancel(task);
			task = false;
		}
	}
}

export function* messagesSaga() {
	yield all([
		cancellableSync(),
		takeEvery(SAVE_MESSAGE_REQUEST, saveMessageSaga),
		takeEvery(DELETE_MESSAGE_REQUEST, deleteMessageSaga)
	]);
}

//////////////////////////////////////////////////////////
// Selectors
//
const messageState = state => state[moduleName];
export const getMessagesIds = state => Object.keys(messageState(state));
export const getMessageById = (state, id) => messageState(state)[id];
