import { call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

const eventName = "visibilitychange";
const options = { capture: true };
const document = window.document;

const isDocumentHidden = () => document.visibilityState !== "visible";

export const createVisibleChangeChanel = delay =>
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

const defaultDelay = 30 * 1000; //30 ces.

export const createVisibleChangeSaga = (delay = defaultDelay) =>
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
