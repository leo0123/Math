import React from "react";
//import styles from "../index.css";

export default class NumButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.Num);
  }

  render() {
    return(
      <div className="myDiv" onClick={this.handleClick}>{this.props.Num}</div>
    );
  }
}
