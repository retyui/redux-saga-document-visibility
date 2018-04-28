import { call, put, race, take } from "redux-saga/effects";
import { delay, eventChannel } from "redux-saga";
import { normalizeDocumentSnapshot } from "./utils";

export const createDeleteReqSaga = (events, apiFn) =>
	function* deleteAny(action) {
		const [SUCCESS, FAILURE] = events;
		try {
			const { timeout } = yield race({
				req: call(apiFn, action.payload),
				timeout: call(delay, 15 * 1000) // # Note1
			});
			/*
			* Note1:
			* Note that it won't resolve while you're offline).
			* https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference#delete
			*/
			if (timeout === true) {
				yield put({
					type: FAILURE,
					payload: new Error("Timeout request")
				});
			} else {
				yield put({
					type: SUCCESS,
					payload: action.payload
				});
			}
		} catch (err) {
			yield put({ type: FAILURE, payload: err });
		}
	};

export const createSaveRequestSaga = (events, apiFn) =>
	function* saveAny(action) {
		const [SUCCESS, FAILURE] = events;
		try {
			const newItem = yield call(apiFn, action.payload);
			yield put({
				type: SUCCESS,
				payload: newItem
			});
		} catch (error) {
			yield put({
				type: FAILURE,
				payload: error
			});
		}
	};

const createRuntimeSyncChanel = query =>
	eventChannel(emmit =>
		// .onSnapshot return unsubscribe function
		query.onSnapshot(querySnapshot =>
			emmit(
				querySnapshot.docs.reduce(
					(acc, doc) => ({ ...acc, ...normalizeDocumentSnapshot(doc) }),
					{}
				)
			)
		)
	);

export const createRuntimeSyncSaga = (query, actions) =>
	function* runtimeSync() {
		const chanel = yield call(createRuntimeSyncChanel, query);
		try {
			if (process.env.NODE_ENV !== "production") {
				console.log(`%c --- ${"subscribe"}`, "background: #222; color: #bd5;");
			}
			while (true) {
				const docsArray = yield take(chanel);
				yield put({
					type: actions.addType,
					payload: docsArray
				});
			}
		} finally {
			if (process.env.NODE_ENV !== "production") {
				console.log(
					`%c --- ${"unsubscribe"}`,
					"background: #222; color: #bd5;"
				);
			}
			// if runtimeSync closed I close chanel
			yield call([chanel, chanel.close]);
		}
	};
