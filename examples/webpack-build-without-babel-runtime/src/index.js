import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { createVisibleChangeSaga } from "redux-saga-document-visibility";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(() => {}, applyMiddleware(sagaMiddleware));


// then run the document-visibility saga
const timeoutDelay = 30 * 1000; // 30 sec.
const visibilitySaga = createVisibleChangeSaga(timeoutDelay); // Create saga
sagaMiddleware.run(visibilitySaga);