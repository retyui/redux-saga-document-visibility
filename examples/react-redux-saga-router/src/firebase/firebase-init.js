import fireBase from '@firebase/app';

import '@firebase/auth';
import '@firebase/firestore';


const appName = 'redux-saga-document-visibility';
// from https://console.firebase.google.com/project/redux-saga-document-visibility/
fireBase.initializeApp({
	apiKey: "AIzaSyBTmB9CsA13xTiKlMbnU9rFWSDBsPwBwKA",
	authDomain: `${appName}.firebaseapp.com`,
	databaseURL: `https://${appName}.firebaseio.com`,
	projectId: `${appName}`,
	storageBucket: "",
	messagingSenderId: "524423293499"
});

fireBase.firestore().settings({timestampsInSnapshots: true});
