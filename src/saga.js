import { call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

const eventName = "visibilitychange";
const options = { capture: true };
const document = window.document;
const isDocumentHidden = () => document.visibilityState !== "visible"; // hidden, prerender, unloaded

const createVisibleChangeChanel = delay =>
	eventChannel(emit => {
		let timeoutId;
		let prevVisibilityState = isDocumentHidden();

		const emitResult = () => {
			const currentVisibilityState = isDocumentHidden();
			if (currentVisibilityState !== prevVisibilityState) {
				prevVisibilityState = currentVisibilityState;
				emit(currentVisibilityState);
			}
		};

		const listener = () => {
			if (process.env.NODE_ENV !== "production") {
				console.log(
					`%c --- document.visibilityState: ${
						document.visibilityState
					}`,
					"background: #222; color: #bd5;"
				);
			}
			clearTimeout(timeoutId);

			if (isDocumentHidden()) {
				timeoutId = setTimeout(emitResult, delay);
			} else {
				emitResult();
			}
		};

		document.addEventListener(eventName, listener, options);

		return () => {
			clearTimeout(timeoutId);
			document.removeEventListener(eventName, listener, options);
		};
	});

export const DOCUMENT_VISIBILITY_CHANGE = "@@DOCUMENT_VISIBILITY_CHANGE";
export const createVisibleChangeSaga = delay =>
	function* onChangeDocumentVisible() {
		const chanel = yield call(createVisibleChangeChanel, delay);
		try {
			while (true) {
				const isDocumentHidden = yield take(chanel);
				yield put({
					type: DOCUMENT_VISIBILITY_CHANGE,
					payload: { visibility: !isDocumentHidden }
				});
			}
		} finally {
			yield call([chanel, chanel.close]);
		}
	};
