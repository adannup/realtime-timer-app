import React, { Component } from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';
import uuidv4 from 'uuid/v4';

export default class TimerDashboard extends Component {
  constructor() {
    super();

    this.state = {
      timers: [
        {
          title: 'Practice squat',
          project: 'Gym Chores',
          id: 1,
          elapsed: 5456099,
          runningSince: Date.now(),
        },
        {
          title: 'Bake squash',
          project: 'Kitchen Chores',
          id: 2,
          elapsed: 1273998,
          runningSince: null,
        },
      ],
    }

    this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this);
  }

  handleCreateFormSubmit(timer) {
    this.createTimer(timer, (t) => {
      // this.setState({
      //   timers: this.state.timers.concat(t)
      // })
      const timers = [...this.state.timers, t];
      this.setState({ timers });
    });
  }

  createTimer(timer, callback) {
    const t = {
      title: timer.title || 'Timer',
      project: timer.project || 'Project',
      id: uuidv4(),
      elapsed: 0,
    };

    callback(t);
  }

  render () {
    return (
      <div className='col-6'>
        <EditableTimerList timers={this.state.timers}/>
        <ToggleableTimerForm isOpen={false} onFormSubmit={this.handleCreateFormSubmit}/>
      </div>
    )
  }
}
