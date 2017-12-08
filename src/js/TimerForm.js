import React, { Component } from 'react';

export default class TimerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        title: this.props.title || '',
        project: this.props.project || ''
      }
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onInputChange(e) {
    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  }

  handleSubmit() {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.fields.title,
      project: this.state.fields.project
    });
  }

  render () {
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className="card mt-4">
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" name='title' value={this.state.title} onChange={this.onInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="project">Project</label>
            <input type="text" className="form-control" name='project' value={this.state.project} onChange={this.onInputChange}/>
          </div>
        </div>
        <div className="card-footer bg-white">
          <button type="button" className="btn btn-outline-info w-50 border-0 rounded-0" onClick={this.handleSubmit} >{submitText}</button>
          <button type="button" className="btn btn-outline-danger w-50 border-0 rounded-0" onClick={this.props.onFormClose} >Cancel</button>
        </div>
      </div>
    );
  }
}

// 109
