import React from "react";
import Expression from "./Expression.jsx";
import NumPad from "./NumPad.jsx";
import ExpressionHelper from "./ExpressionHelper.js";
import $ from "jquery";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.centerStyle = {
      margin: "auto",
      textAlign: "center",
      paddingTop: "100px"
    };
    this.history = null;
    this.load();
    this.config = {
      max: 10,
      count: 2,
      time: (new Date()).toLocaleString()
    };
    this.ExpressionList = ExpressionHelper(this.config);
    this.currentIndex = 0;
    this.currentExpression = this.ExpressionList[this.currentIndex];
    this.startTime = new Date();
    this.currentExpression.time = this.startTime;
    this.state = {
      currentExpression: this.currentExpression,
      answer: "",
      message: ""
    };
    this.numButtonClick = this.numButtonClick.bind(this);
  }

  load() {
    $.ajax({
      dataType: "json",
      url: "https://api.myjson.com/bins/1abwbl",
      context: this,
      success: function(data) {
        this.history = data;
        console.log(data);
      }
    });
  }

  save() {
    var data = {
      config: this.config,
      data: this.ExpressionList
    };
    if (this.history == null) {
      this.history = [];
    }
    this.history.push(data);
    console.log(this.history);
    var jsonStr = JSON.stringify(this.history);
    $.ajax({
      url: "https://api.myjson.com/bins/1abwbl",
      type: "PUT",
      data: jsonStr,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function() {console.log("saved");}
    });
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
    if (this.state.answer == this.currentExpression.result) {
      this.currentExpression.status += "correct;";
      this.currentExpression.time = this.calTime(this.currentExpression.time);
      this.setState({message: "correct"});
      this.tryNext();
    } else {
      this.currentExpression.status += this.state.answer + ";";
      let message = "Oops, " + this.state.answer + " is wrong. Try again.";
      this.setState({
        answer: "",
        message: message
      });
    }
  }

  tryNext() {
    this.currentIndex++;
    this.currentExpression = this.ExpressionList[this.currentIndex];
    if (this.currentExpression) {
      this.currentExpression.time = new Date();
      this.setState({
        currentExpression: this.currentExpression,
        answer: "",
        message: ""
      });
    } else {
      this.setState({
        message: "Good job!"
      });
      this.calTime(this.startTime);
      this.save();
    }
  }

  calTime(startTime) {
    var endTime = new Date();
    var time = endTime - startTime;
    //console.log(time/1000);
    return time / 1000;
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
        <div className="col-md-6" style={this.centerStyle}>
          <Expression data={this.state.currentExpression} answer={this.state.answer} message={this.state.message}/>
        </div>
        <div className="col-md-6" style={this.centerStyle}>
          <NumPad options={this.getNumPadData()} numButtonClick={this.numButtonClick}/>
        </div>
      </div>
    );
  }
}
