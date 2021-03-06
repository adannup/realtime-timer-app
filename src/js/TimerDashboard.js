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
    this.handleStopTimer = this.handleStopTimer.bind(this);
    this.handleStartTimer = this.handleStartTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.sendState = this.sendState.bind(this);
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
      console.log(timers);
    });
  }

  handleCreateFormSubmit(timer) {
    this.createTimer(timer, (newTimer) => {
      // this.setState({
      //   timers: this.state.timers.concat(t)
      // })
      const timers = [...this.state.timers, newTimer];
      this.setState({ timers }, this.sendState);
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
    this.updateTimer(timer);
  }

  updateTimer(timerUpdate) {
    this.setState({
      timers: this.state.timers.map( timer => {
        if(timer.id === timerUpdate.id) {
          return Object.assign({}, timer, {
            title: timerUpdate.title,
            project: timerUpdate.project
          })
        }else {
          return timer;
        }
      })}, this.sendState);
  }

  handleDeleteTimer(timerId) {
    this.deleteTimer(timerId);
  }

  deleteTimer(timerId) {
    this.setState({
      timers: this.state.timers.filter(timer => timer.id !== timerId)
    }, this.sendState)
  }

  handleStopTimer(timerId) {
    this.stopTimer(timerId);
  }

  handleStartTimer(timerId) {
    this.startTimer(timerId);
  }

  stopTimer(timerId) {
    const now = Date.now();

    this.setState(prevState => ({
      timers: this.state.timers.map(timer => {
        if(timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null
          });
        } else {
          return timer;
        }
      })
    }), this.sendState);
  }

  startTimer(timerId) {
    const now = Date.now();

    this.setState(prevState => ({
      timers: prevState.timers.map(timer => {
        if(timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now,
          });
        } else {
          return timer;
        }
      })
    }), this.sendState);
  }

  sendState() {
    socket.emit('saveState', this.state.timers);
  }

  render () {
    return (
      <div className='col-md-6 col-sm-12'>
        <EditableTimerList
          timers={this.state.timers}
          onEditForm={this.handleUpdateFormSubmit}
          onDeleteClick={this.handleDeleteTimer}
          onStartClick={this.handleStartTimer}
          onStopClick={this.handleStopTimer}
        />
        <ToggleableTimerForm isOpen={false} onFormSubmit={this.handleCreateFormSubmit}/>
      </div>
    )
  }
}
