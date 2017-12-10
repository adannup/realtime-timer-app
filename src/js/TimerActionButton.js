import React, { Component } from 'react';

export default class TimerActionButton extends Component{
  render() {
    if(!this.props.timerIsRunning) {
      return (
        <button type="button" className="btn btn-outline-success w-100 border-0 rounded-0" onClick={this.props.onStartClick} >Start</button>
      )
    } else {
      return (
        <button type="button" className="btn btn-outline-danger w-100 border-0 rounded-0" onClick={this.props.onStopClick} >Stop</button>
      )
    }
  }
}
