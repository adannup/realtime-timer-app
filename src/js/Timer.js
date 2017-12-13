import React, { Component } from 'react';
import { renderElapsedString } from './helpers';
import TimerActionButton from './TimerActionButton';

export default class Timer extends Component  {
  constructor() {
    super();

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
  }

  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate() , 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleDeleteClick() {
    this.props.onDeleteClick(this.props.id);
  }

  handleStopClick() {
    this.props.onStopClick(this.props.id);
  }

  handleStartClick() {
    this.props.onStartClick(this.props.id);
  }

  render () {
    const elapsedString = renderElapsedString(this.props.elapsed, this.props.runningSince);
    return (
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title text-center">{this.props.title}</h4>
          <h6 className="card-subtitle mb-2 text-muted text-center">{this.props.project}</h6>
          <h3 className="text-center">{elapsedString}</h3>
          <div className='row'>
            <div className='col-12'>
              <button type="button" className="btn btn-light float-right ml-2"><i className="material-icons" onClick={this.props.onEditClick} >mode_edit</i></button>
              <button type="button" className="btn btn-light float-right "><i className="material-icons" onClick={this.handleDeleteClick}>delete</i></button>
            </div>
          </div>
        </div>
        <div className="card-footer bg-white">
          <TimerActionButton
            timerIsRunning={!!this.props.runningSince}
            fetched={this.props.fetched}
            onStopClick={this.handleStopClick}
            onStartClick={this.handleStartClick}
          />
        </div>
      </div>
    )
  }
}
