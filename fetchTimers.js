const path = require('path');
const fs = require('fs');

const pathFile = path.join(__dirname, 'data/data.json');

const fetchTimers = () => {
  try{
    const timers = fs.readFileSync(pathFile);
    return JSON.parse(timers);
  } catch(err) {
    if(err.code === 'ENOENT') {
      console.log('File dont found');
    }
  }
}

const saveTimers = (timers) => {
  fs.writeFileSync(pathFile, JSON.stringify(timers));
}

const addTimer = (timer) => {
  const timers = fetchTimers();
  timers.push(timer);
  saveTimers(timers);
}

const deleteTimer = timerId => {
  const timers = fetchTimers();
  const newTimers = timers.filter( timer => timerId !== timer.id);
  saveTimers(newTimers);
}

const editTimer = timerEdited => {
  const timers = fetchTimers();

  timers.forEach(timer => {
    if(timer.id === timerEdited.id) {
      timer.title = timerEdited.title,
      timer.project = timerEdited.project
    }else {
      return timer;
    }
  });

  saveTimers(timers);
}

module.exports = {
  fetchTimers,
  addTimer,
  deleteTimer,
  editTimer
}
