import React, { Component } from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';
import uuidv4 from 'uuid/v4';
import io from 'socket.io-client';
const socket = io();

export default class TimerDashboard extends Component {
  constructor() {
    super();

    this.state = {
      timers: []
    }

    this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this);
    this.handleUpdateFormSubmit = this.handleUpdateFormSubmit.bind(this);
    this.handleDeleteTimer = this.handleDeleteTimer.bind(this);
    this.handleRunningTimer = this.handleRunningTimer.bind(this);

  }

  componentWillMount() {
    socket.on('connect', () => {
      console.log('Connected to server');

      socket.on('setTimers',(timers) => {
        this.setState({ timers });
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnected from server');
    });
  }

  componentDidMount() {
    socket.on('updateData', (timers) => {
      this.setState({ timers });
    });
  }

  handleCreateFormSubmit(timer) {
    this.createTimer(timer, (newTimer) => {
      // this.setState({
      //   timers: this.state.timers.concat(t)
      // })
      const timers = [...this.state.timers, newTimer];
      // this.setState({ timers });
      socket.emit('addTimer', newTimer);
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

  handleUpdateFormSubmit(timer) {
    // this.updateTimer(timer, (timers) => {
    //   this.setState({ timers });
    // });
    socket.emit('editTimer', timer);
  }

  updateTimer(timerUpdate, callback) {
    // const timers = this.state.timers.map( timer => {
    //   if(timer.id === timerUpdate.id) {
    //     return Object.assign({}, timer, {
    //       title: timerUpdate.title,
    //       project: timerUpdate.project
    //     })
    //   }else {
    //     return timer;
    //   }
    // });
    //
    // callback(timers);
  }

  handleDeleteTimer(timerId) {
    this.deleteTimer(timerId);
  }

  deleteTimer(timerId) {
    // this.setState({
    //   timers: this.state.timers.filter(timer => timer.id !== timerId)
    // })
    socket.emit('deleteTimer',timerId);
  }

  handleRunningTimer(timerId) {
    this.setState({
      timers: this.state.timers.map(timer => {
        if(timer.id === timerId) {
          if(!!timer.runningSince) {
            return this.stopTimer(timer);
          } else {
            return this.startTimer(timer);
          }
        } else {
          return timer;
        }
      })
    })
  }

  startTimer(timer) {
    const now = Date.now();
    return Object.assign({}, timer, {
      runningSince: now,
    });
  }

  stopTimer(timer) {
    const now = Date.now();
    const lastElapsed = now - timer.runningSince;
    return Object.assign({}, timer, {
      elapsed: timer.elapsed + lastElapsed,
      runningSince: null
    });
  }

  render () {
    return (
      <div className='col-md-6 col-sm-12'>
        <EditableTimerList
          timers={this.state.timers}
          onEditForm={this.handleUpdateFormSubmit}
          onDeleteClick={this.handleDeleteTimer}
          onRunningClick={this.handleRunningTimer}
        />
        <ToggleableTimerForm isOpen={false} onFormSubmit={this.handleCreateFormSubmit}/>
      </div>
    )
  }
}
