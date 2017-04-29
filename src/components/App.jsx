import React from 'react';
import Expression from "./Expression.jsx";
import NumPad from "./NumPad.jsx"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: 2,
      num2: 3,
      operator: "+",
      answer: "",
      result: 5,
      status: ""
    };
    this.numButtonClick = this.numButtonClick.bind(this);
  }

  numButtonClick(e) {
    if (e == "OK") {
      check();
      return;
    }
    if (e == "Cancel") {
      this.setState({answer: ""});
      return;
    }
    let answer = this.state.answer + e;
    this.setState({answer: answer});
  }

  check() {

  }

  getNumPadData() {
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
          title: 0
        }, {
          title: "OK"
        }, {
          title: "Cancel"
        }
      ]
    ];
    for (let i = 0; i <= 2; i++) {
      let row = rows[i];
      for (let j = 0; j <= 2; j++) {
        let obj = row[j];
        obj.title = i * 3 + j + 1;
      }
    }
    return rows;
  }

  render() {
    return (
      <div>
        <Expression num1={this.state.num1} num2={this.state.num2} operator={this.state.operator} answer={this.state.answer}/>
        <NumPad data={this.getNumPadData()} numButtonClick={this.numButtonClick}/>
      </div>
    );
  }
}
