import React from "react";
import NumButton from "./NumButton.jsx";
//import styles from "../index.css";

export default class NumPad extends React.Component {
  render() {
    return(
      <div>
        <div>
          <NumButton Num="1" />
          <NumButton Num="2" />
          <NumButton Num="3" />
        </div>
        <div>
          <NumButton Num="4" />
          <NumButton Num="5" />
          <NumButton Num="6" />
        </div>
        <div>
          <NumButton Num="7" />
          <NumButton Num="8" />
          <NumButton Num="9" />
        </div>
        <div>
          <NumButton Num="0" />
          <NumButton Num="OK" />
          <NumButton Num="Cancel" />
        </div>
      </div>
    );
  }
}
