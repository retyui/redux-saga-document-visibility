import React  from "react";
import { Switch, Route, Link } from "react-router-dom";

import {Home} from "../pages/Home";
import {Messages} from "../pages/MessagesPage";
import {NotFound} from "../pages/404";
import {messagesPathname} from "../routs";

export const Root = () => (
	<React.Fragment>
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to={messagesPathname}>Go to messages</Link>
			</li>
		</ul>
		<hr />
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path={messagesPathname} component={Messages} />
			<Route component={NotFound} />
		</Switch>
	</React.Fragment>
);
