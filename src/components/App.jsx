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
          result: 5,
          status: ""
        };
    }

    render() {
        return (
            <div>
              <Expression num1={this.state.num1} num2={this.state.num2} operator={this.state.operator}/>
              <NumPad />
            </div>
        );
    }
}
