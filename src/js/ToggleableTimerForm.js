import React, { Component } from 'react';
import TimerForm from './TimerForm';

export default class ToggleableTimerForm extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    }

    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormOpen() {
    this.setState({
      isOpen: this.state.isOpen ? false : true
    });
  }

  handleFormSubmit(timer) {
    this.props.onFormSubmit(timer);
    this.handleFormOpen();
  }

  render () {
    if (this.state.isOpen) {
      return (
        <TimerForm onFormClose={this.handleFormOpen} onFormSubmit={this.handleFormSubmit}/>
      );
    } else {
      return (
        <div className="card mt-4">
          <div className="card-body">
            <button type="button" className="btn btn-outline-primary w-100 rounded-0 border-0" onClick={this.handleFormOpen}>+</button>
          </div>
        </div>
      )
    }
  }
}
