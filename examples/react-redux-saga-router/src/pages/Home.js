import React from "react";
import {Link} from 'react-router-dom';

import {messagesPathname} from "../routs";

export const Home = () => (
	<React.Fragment>
		<h1>Home page!</h1>
		<p>
			Open <Link to={messagesPathname}>message page</Link> and check in console
			subscribe notification!
		</p>
		<p>
			Try switching between the <Link to="/">home</Link> and the{" "}
			<Link to={messagesPathname}>message page</Link>
		</p>
	</React.Fragment>
);
