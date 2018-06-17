# redux-saga-document-visibility

[![npm](https://img.shields.io/npm/v/redux-saga-document-visibility.svg)](https://www.npmjs.com/package/redux-saga-document-visibility)

Saga dispatch action if the page content is not visible to the user. The [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) uses.

[Can i use `IE 10+`](https://caniuse.com/#feat=pagevisibility)

## Install

```bash
# for babel@6
yarn add -D redux-saga-document-visibility redux-saga babel-runtime
# for babel@7
yarn add -D redux-saga-document-visibility redux-saga @babel/runtime
```

<details>
    <summary>Install with Npm</summary>
    <pre>
    # for babel@6
    npm install --save-dev redux-saga-document-visibility redux-saga babel-runtime
    # for babel@7
    yarn install --save-dev redux-saga-document-visibility redux-saga @babel/runtime
    </pre>
</details>

## Usage Example

#### `main.js`

```js
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { createVisibleChangeSaga } from "redux-saga-document-visibility"; // for babel@6
// import { createVisibleChangeSaga } from "redux-saga-document-visibility/lib"; // for babel@7

import reducer from "./reducers";
import mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

// then run the document-visibility saga
const timeoutDelay = 30 * 1000; // 30 sec.
const visibilitySaga = createVisibleChangeSaga(timeoutDelay); // Create saga
sagaMiddleware.run(visibilitySaga);
```

#### `sagas.js`

```js
import { DOCUMENT_VISIBILITY_CHANGE } from "redux-saga-document-visibility";

function* cancellableSync() {
    while (true) {
        const { payload } = yield take(DOCUMENT_VISIBILITY_CHANGE);
        console.log(payload.visibility);
        if (payload.visibility) {
            // do something
        }
    }
}
```

## Example

*   [Background Sync : React + Redux + redux-saga + react-router (API firebase.firestore)](https://github.com/retyui/redux-saga-document-visibility/tree/master/examples/react-redux-saga-router)
*   [Webpack + babel config without Babel Runtime](https://github.com/retyui/redux-saga-document-visibility/blob/master/examples/webpack-build-without-babel-runtime/README.md)

## Options

### `createVisibleChangeSaga(timeoutDelay: Number)` - Time in ms (default: 30000ms)

The user can switch to other tabs during work and return to this tab, the `timeoutDelay` help to reduce reconnection count

`timeoutDelay` work only for `document.visibilityState !== 'visible'`

This means that if the user returns to this tab, the saga will dispatch the action (change) immediately. Having processed it you can reconnections to the runtime service (`socket`, `firebase.firestore`, ...)

## CommonJS modules & ES modules

When Babel@7 will be released, I will delete the old js bundel.

```js
// for babel@6
import { createVisibleChangeSaga } from "redux-saga-document-visibility"; // CommonJS
import { createVisibleChangeSaga } from "redux-saga-document-visibility/esm-old"; // ESM

// for babel@7
import { createVisibleChangeSaga } from "redux-saga-document-visibility/lib"; // CommonJS
import { createVisibleChangeSaga } from "redux-saga-document-visibility/esm"; // ESM
```
