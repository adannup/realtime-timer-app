const express = require('express');
const app = express();
const path = require('path');
const webpack = require('webpack');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const {fetchTimers, saveTimers} = require('./utilsTimers');
const config = require('./webpack.config');
const api = require('./api');

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

  socket.on('saveState', (timers) => {
    saveTimers(timers);
    socket.broadcast.emit('updateData', fetchTimers());
  })
});

app.use('/api', api);

http.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
