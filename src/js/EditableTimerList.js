import React, { Component } from 'react';
import EditableTimer from './EditableTimer';

export default class EditableTimerList extends Component {
  render () {
    const timers = this.props.timers.map(timer => (
      <EditableTimer
        key={timer.id}
        id={timer.id}
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
        onEditForm={this.props.onEditForm}
        onDeleteClick={this.props.onDeleteClick}
        onStopClick={this.props.onStopClick}
        onStartClick={this.props.onStartClick}
      />
    ));
    return (
      <div className='timers'>
        {timers}
      </div>
    )
  }
}
