import React, { Component } from 'react';
import TimerDashboard from './TimerDashboard';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row justify-content-md-center mt-5 mb-5'>
          <TimerDashboard />
        </div>
      </div>
    )
  }
}

export default App;
