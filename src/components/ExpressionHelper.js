import $ from "jquery";

var urlBase = "https://api.myjson.com/bins/";//http://myjson.com/1abwbl
var urlOneTest = urlBase + "eal6p";
var urlHistory = urlBase + "1abwbl";
var history;
var config;
var ExpressionList = [];
var currentIndex = 0;
var currentExpression;

function check(answer) {
  if (answer == currentExpression.result) {
    if (currentExpression.status) {
      currentExpression.status += "wrong";
    } else {
        currentExpression.status = "correct";
    }
    currentExpression.time = calculateTime(currentExpression.time);
    return tryNext();
  } else {
    currentExpression.status += answer + ";";
    return {
      answer: "",
      message: "Oops, " + answer + " is wrong. Try again."
    };
  }
}

function tryNext() {
  if (++currentIndex < ExpressionList.length) {
    return {
      currentExpression: getCurrentExpression(),
      answer: "",
      message: "",
      remaining: getRemaining()
    };
  } else {
    currentIndex--;
    var list = ExpressionList.filter(function(exp) {
      return exp.status == "correct";
    });
    var per = list.length + "/" + config.count;
    config.time = calculateTime(config.date);
    var minutes = config.time/60;
    save();
    return {
      message: "Congratulations! You have finished " + per + " in " + minutes.toFixed(1) + " minutes "
    };
  }
}

function load() {
  $.ajax({
    dataType: "json",
    url: urlHistory,
    //context: this,
    success: function(data) {
      history = data;
    }
  });
}

function save() {
  var data = {
    config: config,
    data: ExpressionList
  };
  if (history == null) {
    history = [];
  }
  history.push(data);
  var jsonStr = JSON.stringify(history);
  var url = urlHistory;
  //var jsonStr = JSON.stringify(data);
  //var url = urlOneTest;
  $.ajax({
    url: url,
    type: "PUT",
    data: jsonStr,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function() {console.log("saved");}
  });
}

function calculateTime(startTime) {
  var endTime = new Date();
  var time = endTime - startTime;
  return time / 1000;
}

function getCurrentExpression() {
  currentExpression = ExpressionList[currentIndex];
  if (!currentExpression.time) {
    currentExpression.time = new Date();
  }
  return currentExpression;
}

function getRemaining() {
  return currentIndex + 1 + "/" + config.count;
}

function initExpressionList(_config) {
  load();
  config = _config;
  var i = 1;
  var num1;
  var num2;
  var op;
  var exp;
  while (i <= config.count) {
    num1 = getRandomInt(1, config.max);
    num2 = getRandomInt(1, config.max);
    op = getRandomOperator(num1, num2);
    exp = {
      num1: op.num1,
      operator: op.operator,
      num2: op.num2,
      result: op.result,
      status: ""
    };
    ExpressionList.push(exp);
    i++;
  }
  return ExpressionList;
}

function getRandomOperator(num1, num2) {
  var x = getRandomInt(0, 2);
  if (x) {
    return {
      operator: "+",
      num1: num1,
      num2: num2,
      result: num1 + num2
    };
  } else {
    var n1 = Math.max(num1, num2);
    var n2 = Math.min(num1, num2);
    return {
      operator: "-",
      num1: n1,
      num2: n2,
      result: n1 - n2
    };
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default {
  initExpressionList: initExpressionList,
  getCurrentExpression: getCurrentExpression,
  getRemaining: getRemaining,
  check: check
};
