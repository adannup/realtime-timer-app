import React, { Component } from 'react';

export default class Timer extends Component  {
  render () {
    const elapsedString = this.props.elapsed;
    return (
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title text-center">{this.props.title}</h4>
          <h6 className="card-subtitle mb-2 text-muted text-center">{this.props.project}</h6>
          <h3 className="text-center">{elapsedString}</h3>
          <div className='row'>
            <div className='col-12'>
              <button type="button" className="btn btn-light float-right ml-2"><i className="material-icons">mode_edit</i></button>
              <button type="button" className="btn btn-light float-right "><i className="material-icons">delete</i></button>
            </div>
          </div>
        </div>
        <div className="card-footer bg-white">
          <button type="button" className="btn btn-outline-success w-100 border-0 rounded-0">Start</button>
        </div>
      </div>
    )
  }
}
