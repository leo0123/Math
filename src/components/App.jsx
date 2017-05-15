import React from "react";
import Expression from "./Expression.jsx";
import NumPad from "./NumPad.jsx";
import ExpressionHelper from "./ExpressionHelper.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.center = {
      margin: "auto",
      textAlign: "center",
      paddingTop: "100px"
    };
    var config = {
      max: 20,
      count: 100
    };
    var ExpressionList = ExpressionHelper(config);
    this.currentExpression = ExpressionList[0];
    this.state = this.currentExpression;
    this.numButtonClick = this.numButtonClick.bind(this);
  }

  numButtonClick(e) {
    if (e == "OK") {
      this.check();
      return;
    }
    if (e == "C") {
      this.setState({answer: ""});
      return;
    }
    let answer = this.state.answer + e;
    this.setState({answer: answer});
  }

  check() {
    var status;
    if (this.state.answer == this.state.result) {
      status = "correct";
      this.currentExpression.status += "correct;";
      this.setState({status: status});
    } else {
      status = "Oops, " + this.state.answer + " is wrong. Try again.";
      this.currentExpression.status += "wrong:" + this.state.answer + ";";
      this.setState({status: status, answer: ""});
    }
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
      <div className="row">
        <div className="col-md-6" style={this.center}>
          <Expression num1={this.state.num1} num2={this.state.num2} operator={this.state.operator} answer={this.state.answer} status={this.state.status}/>
        </div>
        <div className="col-md-6" style={this.center}>
          <NumPad options={this.getNumPadData()} numButtonClick={this.numButtonClick}/>
        </div>
      </div>
    );
  }
}
