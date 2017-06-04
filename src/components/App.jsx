import React from "react";
import Expression from "./Expression.jsx";
import NumPad from "./NumPad.jsx";
import ExpressionHelper from "./ExpressionHelper.js";
import $ from "jquery";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.centerStyle = {
      margin: "auto",
      textAlign: "center",
      paddingTop: "100px"
    };
    this.style = {
      fontSize: 20
    };
    this.history = null;
    this.load();
    this.config = {
      max: 20,
      count: 100,
      date: new Date()
    };
    ExpressionHelper.initExpressionList(this.config);
    this.state = {
      currentExpression: ExpressionHelper.getCurrentExpression(),
      answer: "",
      message: "",
      remaining: ExpressionHelper.getRemaining(),
      dialogOpen: true,
      config: this.config
    };
    this.numButtonClick = this.numButtonClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfigMaxChange = this.handleConfigMaxChange.bind(this);
    this.handleConfigCountChange = this.handleConfigCountChange.bind(this);
    this.getDialogStatus = this.getDialogStatus.bind(this);
    window.numPress = this.numButtonClick;
    window.getDialogStatus = this.getDialogStatus;
    window.onkeyup = function(e) {
      if (window.getDialogStatus()) {
        return;
      }
      var key = e.keyCode
        ? e.keyCode
        : e.which;

      if (48 <= key && key <= 57) {
        window.numPress(key - 48);
      } else if (96 <= key && key <= 105) {
        window.numPress(key - 96);
      } else if (key == 13) {
        window.numPress("OK");
      } else if (key == 110) {
        window.numPress("C");
      }
    };
  }

  getDialogStatus() {
    return this.state.dialogOpen;
  }

  load() {
    $.ajax({
      dataType: "json", url: "https://api.myjson.com/bins/1abwbl", //http://myjson.com/1abwbl
      context: this,
      success: function(data) {
        this.history = data;
        //console.log(data);
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
    //console.log(this.history);
    var jsonStr = JSON.stringify(this.history);
    $.ajax({
      url: "https://api.myjson.com/bins/1abwbl",
      type: "PUT",
      data: jsonStr,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function() {
        console.log("saved");
      }
    });
  }

  numButtonClick(e) {
    if (e == "OK") {
      //this.check();
      this.setState(ExpressionHelper.check(this.state.answer));
      return;
    }
    if (e == "C") {
      this.setState({answer: ""});
      return;
    }
    //let answer = this.state.answer + e;
    this.setState({
      answer: this.state.answer + e
    });
  }

  handleClose() {
    this.config.date = new Date();
    console.log(this.config);
    this.setState({dialogOpen: false});
  }

  handleConfigMaxChange(e, v) {
    this.config.max = v;
    this.setState({config: this.config});
  }

  handleConfigCountChange(e, v) {
    this.config.count = v;
    this.setState({config: this.config});
  }

  /*check() {
    if (this.state.answer == this.currentExpression.result) {
      if (this.currentExpression.status) {
        this.currentExpression.status += "wrong";
      } else {
          this.currentExpression.status = "correct";
      }
      this.currentExpression.time = this.calculateTime(this.currentExpression.time);
      this.setState({
        message: "correct",
        remaining: this.currentIndex + 2 + "/" + this.config.count
      });
      this.tryNext();
    } else {
      this.currentExpression.status += this.state.answer + ";";
      this.setState({
        answer: "",
        message: "Oops, " + this.state.answer + " is wrong. Try again."
      });
    }
  }*/

  /*tryNext() {
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
      var list = this.ExpressionList.filter(function(exp) {
        return exp.status == "correct";
      });
      console.log(list);
      var per = list.length + "/" + this.config.count;
      var seconds = this.calculateTime(this.startTime);
      this.config.time = seconds;
      var minutes = seconds / 60;
      this.setState({
        message: "Congratulations! You have finished " + per + " in " + minutes.toFixed(1) + " minutes "
      });
      this.save();
    }
  }*/

  /*calculateTime(startTime) {
    var endTime = new Date();
    var time = endTime - startTime;
    //console.log(time/1000);
    return time / 1000;
  }*/

  render() {
    const actions = [
      <button onClick = {this.handleClose} className = "btn btn-default" style = {this.style} > start </button>
    ];

    return (
      <div >
        <MuiThemeProvider>
          <Dialog title="settings" actions={actions} modal={true} open={this.state.dialogOpen}>
            <div className="row" style={this.centerStyle}>
              max:<TextField hintText="number" style={this.style}
                defaultValue={this.state.config.max} onChange={this.handleConfigMaxChange}/>
            </div>
            <div className="row" style = {this.centerStyle}>
              count : <TextField hintText="number" style={this.style}
                defaultValue={this.state.config.count} onChange={this.handleConfigCountChange}/>
            </div>
          </Dialog>
        </MuiThemeProvider>
        <div className = "row" style = {this.centerStyle}>
          <div style={this.style}>{this.state.remaining}</div>
        </div>
        <div className="row" style={this.centerStyle}>
          <Expression data={this.state.currentExpression} answer={this.state.answer} message={this.state.message}/>
        </div>
        <div className = "row" style = {this.centerStyle} >
          <NumPad numButtonClick={this.numButtonClick}/>
        </div>
      </div>);
    }
  }
