var ExpressionList = [];
export default function initExpressionList(config) {
  var i = 1;
  var num1;
  var num2;
  var op;
  var exp;
  while (i <= config.count) {
    num1 = getRandomInt(0, config.max);
    num2 = getRandomInt(0, config.max);
    op = getRandomOperator(num1, num2);
    exp = {
      num1: op.num1,
      num2: op.num2,
      operator: op.operator,
      answer: "",
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
