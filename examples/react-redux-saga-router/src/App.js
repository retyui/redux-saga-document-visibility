import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import { history } from "./history";
import { store } from "./redux/store";
import { Root } from "./components/Root";

export const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Root />
		</ConnectedRouter>
	</Provider>
);
