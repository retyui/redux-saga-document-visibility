import React from 'react';
import ReactDOM from 'react-dom';

import './firebase/firebase-init';
import {App} from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// mkdir ./node_modules/redux-saga-document-visibility ; ln -sf ~/work/redux-saga-document-visibility/lib-old/saga.js ./node_modules/redux-saga-document-visibility/index.js
