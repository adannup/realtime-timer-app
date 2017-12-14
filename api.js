const express = require('express');
const api = express.Router();
const bodyParser = require('body-parser');
const utilsTimers = require('./utilsTimers');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');

const DATA_PATH = path.join(__dirname, 'data/data.json');

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

api

api.post('/timers/start', (req, res) => {
  const timerId = req.body.id;
  const now = Date.now();

  fs.readFile(DATA_PATH, (err, data) => {
    const timers = JSON.parse(data);
    timers.forEach(timer => {
      if(timer.id === timerId) {
        timer.runningSince = now;
      }
    });

    fs.writeFile(DATA_PATH, JSON.stringify(timers, null, 4), () => {
      res.status(200).send({});
    })
  })
});

api.post('/timers/stop', (req, res) => {
  const timerId = req.body.id;
  const now = Date.now();

  fs.readFile(DATA_PATH, (err, data) => {
    const timers = JSON.parse(data);
    timers.forEach(timer => {
      if(timer.id === timerId) {
        const lastElapsed = now - timer.runningSince;
        timer.elapsed = timer.elapsed + lastElapsed;
        timer.runningSince = null;
      }
    });

    fs.writeFile(DATA_PATH, JSON.stringify(timers, null, 4), () => {
      res.status(200).send({});
    })
  })
});

api.route('/timers/')
  .get((req, res) => {
    const timersJson = utilsTimers.fetchTimers();
    res.status(200).send(timersJson);
  })
  .post((req, res) => {
    const newTimer = {
      title: req.body.title,
      project: req.body.project,
      runningSince: null,
      elapsed: 0,
      id: uuidv4()
    }

    fs.readFile(DATA_PATH, (err, data) => {
      if(err) throw err;
      const timers = JSON.parse(data);
      timers.push(newTimer);

      fs.writeFile(DATA_PATH, JSON.stringify(timers, null, 4), () => {
        res.status(200).json(newTimer);
      })
    })
  })
  .put((req, res) => {
    const timerId = req.body.id;
    fs.readFile(DATA_PATH, (err, data) => {
      if(err) throw err;
      const timers = JSON.parse(data);
      timers.forEach(timer => {
        if(timer.id === timerId) {
          timer.title = req.body.title;
          timer.project = req.body.project;
        }
      });

      fs.writeFile(DATA_PATH, JSON.stringify(timers, null, 4), () => {
        res.status(200).json(timers);
      })
    })
  })
  .delete((req, res) => {
    const timerId = req.body.id;
    fs.readFile(DATA_PATH, (err, data) => {
      if(err) throw err;
      const timers = JSON.parse(data);
      const newTimers = timers.filter((timer => timer.id !== timerId));
      console.log(newTimers);
      fs.writeFile(DATA_PATH, JSON.stringify(newTimers, null, 4), () => {
        res.status(200).json({});
      })
    });
  });

module.exports = api;
