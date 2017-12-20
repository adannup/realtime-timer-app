const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const DATA_PATH = path.join(__dirname, 'data/data.json');
const errorMessage = {
  noExist: {
    code: 200,
    message: 'Timer doesn\'t exist'
  }
}

const fetchTimers = () => {
  try {
    const timers = fs.readFileSync(DATA_PATH);
    return JSON.parse(timers);
  }catch(e) {
    return {
      code: 202,
      error: "An error occur to access data timers"
    }
  }
}

const getTimer = timerId => {
  const timer = timerExist(timerId);
  return timer ? timer : errorMessage.noExist
}

const saveTimers = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, undefined, 4));
}

const addTimer = (timer) => {
  const timers = fetchTimers();
  if(!timers.code) {
    const newTimer = {
      title: timer.title,
      project: timer.project,
      runningSince: null,
      elapsed: 0,
      id: uuidv4()
    }

    timers.push(newTimer);
    saveTimers(timers);
  }
  return timers;
}

const deleteTimer = timerId => {
  const timers = fetchTimers();

  if(!timers.code && timerExist(timerId)) {
    const filteredTimers = timers.filter(timer => timer.id !== timerId);
    saveTimers(timers);
    return filteredTimers;
  }else {
    return timers.code ? timers : errorMessage.noExist;
  }
}

const updateTimer = timerUpdate => {
  const timers = fetchTimers();

  if(!timers.code && timerExist(timerUpdate.id)) {
    timers.forEach(timer => {
      if(timer.id === timerId) {
        timer.title = timerUpdate.title;
        timer.project = timerUpdate.project;
      }
    });
    saveTimers(timers);
  }else {
    return timers.code ? timers : errorMessage.noExist;
  }
}

const stopTimer = timerId => {
  const timers = fetchTimers();

  if(!timers.code && timerExist(timerId)) {
    const now = Date.now();
    timers.forEach(timer => {
      if(timerId === timer.id) {
        const lastElapsed = now - timer.runningSince;
        timer.elapsed = timer.elapsed + lastElapsed;
        timer.runningSince = null;
      }
    });
    saveTimers(timers);
    return timers;
  }else {
    return timers.code ? timers : errorMessage.noExist;
  }
}

const startTimer = (timerId, callback) => {
  const timers = fetchTimers();

  if(!timers.code && timerExist(timerId)) {
    const now = Date.now();
    timers.forEach(timer => {
      if(timerId === timer.id) {
        timer.runningSince = now;
      }
    });
    saveTimers(timers);
    return timers;
  }else {
    return timers.code ? timers : errorMessage.noExist;
  }
}

const timerExist = timerId => {
  const timers = fetchTimers();
  return timers.find(timer => timer.id === timerId);
}

module.exports = {
  saveTimers,
  fetchTimers,
  getTimer,
  addTimer,
  deleteTimer,
  updateTimer,
  stopTimer,
  startTimer
}
