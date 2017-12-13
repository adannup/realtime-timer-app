import React, { Component } from 'react';
import Timer from './Timer';
import TimerForm from './TimerForm';

export default class EditableTimer extends Component {
  constructor() {
    super();

    this.state = {
      editFormOpen: false
    }

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditFormOpen = this.handleEditFormOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEditClick() {
    this.handleEditFormOpen();
  }

  handleEditFormOpen() {
    this.setState({
      editFormOpen: this.state.editFormOpen ? false : true
    })
  }

  handleSubmit(timer) {
    this.handleEditFormOpen();
    this.props.onEditForm(timer);
  }

  render () {
    if(this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormClose={this.handleEditFormOpen}
          onFormSubmit={this.handleSubmit}
        />
      );
    }else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          fetched={this.props.fetched}
          onEditClick={this.handleEditClick}
          onDeleteClick={this.props.onDeleteClick}
          onStopClick={this.props.onStopClick}
          onStartClick={this.props.onStartClick}
        />
      );
    }
  }
}
