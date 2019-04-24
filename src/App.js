import React from "react";
import Coins from "./Coins";
import Coin from "./Coin";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Top from "./Top";
export default function App() {
	return (
		<Router>
			<Top />
			<Route path="/" exact component={Coins} />
			<Route path="/coin/:id" component={Coin} />
		</Router>
	);
}
