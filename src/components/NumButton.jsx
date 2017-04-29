import React from "react";
//import styles from "../index.css";

export default class NumButton extends React.Component {
  render() {
    return(
      <div className="myDiv">{this.props.Num}</div>
    );
  }
}
