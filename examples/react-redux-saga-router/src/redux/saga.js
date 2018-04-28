import { messagesSaga } from "../ducks/messages";
import { createVisibleChangeSaga } from 'redux-saga-document-visibility';

// const timeoutDelay = 30 * 1000; // default 30000ms
const timeoutDelay = 3 * 1000; // 3000ms Demo only!
const visibilitySaga = createVisibleChangeSaga(timeoutDelay); // Create saga

const sagas = [visibilitySaga, messagesSaga];
export const runAllSagas = middleware =>
	sagas.forEach(saga => middleware.run(saga)); // Once run sagas

/*
*
* After run saga will dispatch action if `document.visibilityState` change
* Action object:
* {
*     type: '...', // How to get the type? Look further...
*     payload: {
*         visibility: true // true or false
*     }
* }
*
* Get type:
* import {DOCUMENT_VISIBILITY_CHANGE} from "redux-saga-document-visibility";
*
*/
