// src/redux/store.js
import {applyMiddleware, createStore} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import {history} from '../history';
import {reducer} from './reducer';
import {runAllSagas} from './saga';


const sagaMiddleware = createSagaMiddleware();
const enhancer = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
		applyMiddleware(sagaMiddleware, routerMiddleware(history))
	)
	: applyMiddleware(sagaMiddleware, routerMiddleware(history));
export const store = createStore(reducer, enhancer);

runAllSagas(sagaMiddleware);
