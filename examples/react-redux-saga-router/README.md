# Example for redux-saga-document-visibility
 
This is a small chat application using a realtime DB (firebase.firestore)
- Implemented auto-sync
- Synchronization starts only on a specified Route `/messages`
- And if the user switched from the tab with chat, the synchronization will be disabled after the timeout (`3 secound` demo only , recommended use big value)

## How start
```bash
git clone https://github.com/retyui/redux-saga-document-visibility
cd examples/react-redux-saga-router
yarn
yarn start # run livereload server
```

