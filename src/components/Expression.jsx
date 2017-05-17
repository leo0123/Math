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
        {this.props.data.num1}{" "}
				{this.props.data.operator}{" "}
				{this.props.data.num2}{" "}
        ={" "}
				{this.props.answer}<br/>
        <div style={this.wrongStyle}>
          {this.props.message}
        </div>
      </div>
    );
  }
}
