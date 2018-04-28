# Example for redux-saga-document-visibility

![Example for redux-saga-document-visibility](https://raw.githubusercontent.com/retyui/redux-saga-document-visibility/master/images/firebase.png)

This is a small chat application using a realtime DB (`firebase.firestore`)

*   Implemented auto-sync
*   Synchronization starts only on a specified Route `/messages`
*   And if the user switched from the tab with chat, the synchronization will be disabled after the timeout (`3 secound` demo only , recommended use big value)

## How start

```bash
git clone https://github.com/retyui/redux-saga-document-visibility
cd examples/react-redux-saga-router
yarn
yarn start # run livereload server
```

## Where redux-saga-document-visibility code?

*   [Create and run document-visibility saga](https://github.com/retyui/redux-saga-document-visibility/blob/master/examples/react-redux-saga-router/src/redux/saga.js#L5-L6)
*   [`cancellableSync` saga which starts and stops background synchronization](https://github.com/retyui/redux-saga-document-visibility/blob/master/examples/react-redux-saga-router/src/ducks/messages.js#L94-L128)
