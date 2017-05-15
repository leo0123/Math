import React from "react";

export default class Expression extends React.Component {
	constructor(props) {
		super(props);

		this.style = {
			fontSize: 50
		};
		this.wrongStyle = {
			fontSize: 30,
			color: "red"
		};
	}

	render() {
		return (
			<div style={this.style}>
				{this.props.num1}{" "}
				{this.props.operator}{" "}
				{this.props.num2}{" "}
				={" "}
				{this.props.answer}<br/>
				<div style={this.wrongStyle}>
					{this.props.status}
				</div>
			</div>
		);
	}
}
