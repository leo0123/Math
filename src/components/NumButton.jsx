import React from "react";
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
//import FlatButton from "material-ui/FlatButton";
//import {Button} from "react-bootstrap";

export default class NumButton extends React.Component {
  constructor(props) {
    super(props);

    this.style = {
      height: 100,
      width: 100,
      fontSize: 50
    };

    this.labelStyle = {
      padding: 0,
      fontSize: 50
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.Num);
  }

  /*
  <MuiThemeProvider>
    <FlatButton
      style={this.style}
      labelStyle={this.labelStyle}
      onClick={this.handleClick}
      label={this.props.Num}
    />
  </MuiThemeProvider>
  */

  render() {
    return (
      <button onClick={this.handleClick} className="btn btn-default" style={this.style}>{this.props.Num}</button>
    );
  }
}
