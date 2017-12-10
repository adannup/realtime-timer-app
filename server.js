const express = require('express');
const app = express();
const path = require('path');
const webpack = require('webpack');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const {fetchTimers, addTimer, deleteTimer, editTimer, startTimer, stopTimer} = require('./utilsTimers');
const config = require('./webpack.config');

const PORT = process.env.PORT || config.devServer.port;
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  stats: { colors: true },
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.emit('setTimers', fetchTimers());

  socket.on('addTimer', (timer) => {
    addTimer(timer);
    io.emit('updateData', fetchTimers());
  });

  socket.on('deleteTimer', (timerId) => {
    deleteTimer(timerId);
    io.emit('updateData', fetchTimers());
  });

  socket.on('editTimer', (timerEdited) => {
    editTimer(timerEdited);
    io.emit('updateData', fetchTimers());
  });

  socket.on('startTimer', (timerId) => {
    startTimer(timerId);
    io.emit('updateData', fetchTimers());
  });

  socket.on('stopTimer', (timerId) => {
    stopTimer(timerId);
    io.emit('updateData', fetchTimers());
  });
});

http.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
