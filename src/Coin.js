import React, { Component } from "react";
import Axios from "axios";
import ReactTable from "react-table";
import {
	ResponsiveContainer,
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	YAxis,
	Tooltip,
	Legend
} from "recharts";
import moment from "moment";

export default class Coin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currency: "",
			currencySign: "",
			coin: [],
			history: [],
			columns: [
				{
					Header: "Rank",
					accessor: "rank"
				},
				{
					Header: "Symbol",
					accessor: "symbol"
				},
				{
					Header: "Slug",
					accessor: "slug"
				},
				{
					Header: "Name",
					accessor: "name"
				},
				{
					Header: "Price",
					accessor: "price"
				},
				{
					Header: "Volume",
					accessor: "volume"
				},
				{
					Header: "Go Back",
					Cell: row => (
						<a className="btn btn-primary" href={"/"}>
							Go Back
						</a>
					)
				}
			]
		};
	}

	componentWillMount() {
		console.log(this.props);
		const id = this.props.match.params.id;
		Axios.get("https://api.coinranking.com/v1/public/coin/" + id).then(res => {
			this.setState({
				coin: [res.data.data.coin],
				currency: res.data.data.base.symbol
			});
			console.log(this.state.coin);
		});
		Axios.get(
			"https://api.coinranking.com/v1/public/coin/" + id + "/history/7d"
		).then(res => {
			let history = res.data.data.history;
			history = history.map(h => {
				// let t = new Date(h.timestamp);
				h.timestamp = moment(h.timestamp).format("MM/DD/YYYY hh:MM:ss");
				console.log(h);
				return h;
			});
			this.setState({ history: history });
			console.log(res.data);
		});
	}
	render() {
		return (
			<div className="container">
				<ReactTable
					data={this.state.coin}
					columns={this.state.columns}
					defaultPageSize={1}
					showPaginationBottom={false}
				/>
				<ResponsiveContainer width="100%" height={300} className="pt-5">
					<LineChart
						data={this.state.history}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="timestamp" label={{ fontSize: 10 }} />
						<YAxis unit={this.state.currency} interval="preserveStartEnd" />
						<Tooltip />
						<Legend />
						<Line
							type="basisOpen"
							dataKey="price"
							stroke="#8884d8"
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}
}
