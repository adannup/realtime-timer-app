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

const saveTimers = (timers, callback) => {
  fs.writeFileSync(pathFile, JSON.stringify(timers));
  callback(fetchTimers());
}

module.exports = {
  fetchTimers,
  saveTimers
}
