import React, { Component } from 'react';

export default class TimerActionButton extends Component{
  render() {
    const isFetched = this.props.fetched;
    if(!this.props.timerIsRunning) {
      return (
        <button type="button" className="btn btn-outline-success w-100 border-0 rounded-0" onClick={this.props.onStartClick} disabled={!isFetched}>Start</button>
      )
    } else {
      return (
        <button type="button" className="btn btn-outline-danger w-100 border-0 rounded-0" onClick={this.props.onStopClick} disabled={!isFetched}>Stop</button>
      )
    }
  }
}
