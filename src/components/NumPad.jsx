import React from "react";
import NumButton from "./NumButton.jsx";

export default class NumPad extends React.Component {
  getNumPadOptions() {
    var rows = [
      [
        {}, {}, {}
      ],
      [
        {}, {}, {}
      ],
      [
        {}, {}, {}
      ],
      [
        {
          title: "0"
        }, {
          title: "OK"
        }, {
          title: "C"
        }
      ]
    ];
    for (let i = 0; i <= 2; i++) {
      let row = rows[i];
      for (let j = 0; j <= 2; j++) {
        let obj = row[j];
        obj.title = (6 - i * 3) + (j + 1);
      }
    }
    return rows;
  }

  render() {
    return (
      <div>
        {this.getNumPadOptions().map(function(row, i) {
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
