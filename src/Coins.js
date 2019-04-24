import React, { Component, Fragment } from "react";
import "./App.css";
import ReactTable from "react-table";
import Axios from "axios";
import "react-table/react-table.css";
export default class App extends Component {
	constructor() {
		super();
		this.state = {
			currency: "",
			currencySign: "$",
			coins: [],
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
					Header: "Detail",
					Cell: row => (
						<a className="btn btn-primary" href={"/coin/" + row.original.id}>
							Detail
						</a>
					)
				}
			],
			timePeriod: "7d",
			offset: "0",
			symbols: "",
			str: "https://api.coinranking.com/v1/public/coins?limit=100"
		};
	}

	componentWillMount() {
		Axios.get(this.state.str)
			.then(res => {
				let { base, coins } = res.data.data;
				this.setState({
					currency: base.symbol,
					currencySign: base.sign,
					coins: coins
				});
				console.log(res.data);
			})
			.catch(e => console.log(e));
	}

	handleFilter = () => {
		const { currency, timePeriod, offset, symbols } = this.state;
		let strr =
			symbols === ""
				? `https://api.coinranking.com/v1/public/coins?base=${currency}&timePeriod=${timePeriod}&offset=${offset}`
				: `https://api.coinranking.com/v1/public/coins?base=${currency}&timePeriod=${timePeriod}&offset=${offset}&symbols=${symbols}`;
		console.log(strr);
		this.setState(
			{
				str: strr
			},
			() => this.componentWillMount()
		);
	};

	handleCurrency = e => {
		this.setState({ currency: e.target.value });
	};

	handleTimePeriod = e => {
		this.setState({ timePeriod: e.target.value });
	};

	handleSymbols = e => {
		this.setState({ symbols: e.target.value });
	};

	handleOffset = e => {
		this.setState({ offset: e.target.value });
	};

	render() {
		return (
			<div className="container">
				<div className="col-xs-12">
					<div className="form-group">
						<label htmlFor="currency" className="form-label">
							Currency
						</label>
						<select
							name="currency"
							id="currency"
							className="form-control"
							onChange={this.handleCurrency}
							value={this.state.currency}
						>
							<option value="USD">USD</option>
							<option value="EUR">EUR</option>
							<option value="JPY">JPY</option>
							<option value="BTC">BTC</option>
							<option value="ETH">ETH</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="timePeriod" className="form-label">
							Time Period
						</label>
						<select
							name="timePeriod"
							id="timePeriod"
							className="form-control"
							onChange={this.handleTimePeriod}
							value={this.state.timePeriod}
						>
							<option value="24h">24 Hours</option>
							<option value="7d">7 Days</option>
							<option value="30d">30 Days</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="symbols" className="form-label">
							Symbols (comma separated string)
						</label>
						<input
							type="text"
							name="symbols"
							id="symbols"
							className="form-control"
							onChange={this.handleSymbols}
							value={this.state.symbols}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="offset" className="form-label">
							Offset (should be a number. skip x number of records)
						</label>
						<input
							type="text"
							name="offset"
							id="offset"
							className="form-control"
							onChange={this.handleOffset}
							value={this.state.offset}
						/>
					</div>

					<div className="form-group">
						<button className="btn btn-success" onClick={this.handleFilter}>
							Update Data
						</button>
					</div>
				</div>
				<ReactTable data={this.state.coins} columns={this.state.columns} />
			</div>
		);
	}
}
