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
    var config = {
      max: 20,
      count: 10
    };
    this.ExpressionList = ExpressionHelper(config);
    this.currentIndex = 0;
    this.currentExpression = this.ExpressionList[this.currentIndex];
    this.state = {
        currentExpression: this.currentExpression
    };
    this.numButtonClick = this.numButtonClick.bind(this);
    this.startTime = new Date();
    this.test();
  }

  test() {
    /*$.ajax({
      dataType: "json",
      url: "https://api.myjson.com/bins/1abwbl",
      //data: data,
      success: function(data) {
        console.log(data);
      }
    });*/
    $.ajax({
        url:"https://api.myjson.com/bins/1abwbl",
        type:"PUT",
        data:'{"name1":"test1"}',
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data, textStatus, jqXHR){

        }
    });
  }

  numButtonClick(e) {
    if (e == "OK") {
      this.check();
      return;
    }
    if (e == "C") {
      this.currentExpression.answer = "";
      this.setState({currentExpression: this.currentExpression});
      return;
    }
    let answer = this.currentExpression.answer + e;
    this.currentExpression.answer = answer;
    this.setState({currentExpression: this.currentExpression});
  }

  check() {
    if (this.currentExpression.answer == this.currentExpression.result) {
      this.currentExpression.status += "correct;";
      this.currentExpression.message = "correct";
      this.setState({currentExpression: this.currentExpression});
      this.tryNext();
    } else {
      this.currentExpression.status += "wrong:" + this.currentExpression.answer + ";";
      this.currentExpression.message = "Oops, " + this.currentExpression.answer + " is wrong. Try again.";
      this.setState({currentExpression: this.currentExpression});
    }
  }

  tryNext() {
    this.currentIndex++;
    this.currentExpression = this.ExpressionList[this.currentIndex];
    if (this.currentExpression) {
      this.setState({currentExpression: this.currentExpression});
    } else {
      this.calTime();
    }
  }

  calTime() {
    var endTime = new Date();
    var time = endTime - this.startTime;
    console.log(time/1000);
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
          <Expression data={this.state.currentExpression}/>
        </div>
        <div className="col-md-6" style={this.centerStyle}>
          <NumPad options={this.getNumPadData()} numButtonClick={this.numButtonClick}/>
        </div>
      </div>
    );
  }
}
