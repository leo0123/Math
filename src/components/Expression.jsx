import React from "react";

export default class Expression extends React.Component {
  render() {
    return(
      <div>{this.props.num1}{this.props.operator}{this.props.num2}={this.props.result}</div>
    );
  }
}
