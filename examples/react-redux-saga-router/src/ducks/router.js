import {routerReducer as router} from 'react-router-redux';

const moduleName = 'router';

export const routerReducer = {
	[moduleName]: router
};

export const getLocation = state => state[moduleName].location;
export const getRouterPathName = state => getLocation(state).pathname;

