import React from "react";
import NumButton from "./NumButton.jsx";

export default class NumPad extends React.Component {
  render() {
    return (
      <div>
        {this.props.options.map(function(row, i) {
          return (
            <div key={i}>
              {row.map(function(obj) {
                return (
                  <NumButton
                    key={obj.title}
                    Num={obj.title}
                    onClick={this.props.numButtonClick}
                  />
                );
              }, this)}
            </div>
          );
        }, this)}
      </div>
    );
  }
}
