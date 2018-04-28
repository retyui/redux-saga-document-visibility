# redux-saga-document-visibility

Saga helps monitor the activity of a tab using [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)

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

## Usage

```js
/*
 for babel@7
import {
    createVisibleChangeSaga,
    DOCUMENT_VISIBILITY_CHANGE
} from "redux-saga-document-visibility/lib";
*/

// for babel@6
import {
    createVisibleChangeSaga,
    DOCUMENT_VISIBILITY_CHANGE
} from "redux-saga-document-visibility";

```
## Example
- [React + Redux + redux-saga + react-router (API firebase.firestore)]()



## Options

### `createVisibleChangeSaga(timeoutDelay: Number) - time in ms (default: 30000ms)`

The user can switch to other tabs during work and return to this tab, the `timeoutDelay` help to reduce reconnection count

`timeoutDelay` work only for `document.visibilityState !== 'visible'`

This means that if the user returns to this tab, the saga will dispatch the action (change) immediately. Having processed it you can reconnections to the runtime service (`socket`, `firebase.firestore`, ...)
