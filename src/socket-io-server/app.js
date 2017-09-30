const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!

var feed = require('./feed');

io.on('connection', function (socket) {
  console.log('User connected. Socket id %s', socket.id);

  socket.on('join', function (rooms) {
      console.log('Socket %s subscribed to %s', socket.id, rooms);
      if (Array.isArray(rooms)) {
          rooms.forEach(function(room) {
              socket.join(room);
          });
      } else {
          socket.join(rooms);
      }
  });

  socket.on('leave', function (rooms) {
      console.log('Socket %s unsubscribed from %s', socket.id, rooms);
      if (Array.isArray(rooms)) {
          rooms.forEach(function(room) {
              socket.leave(room);
          });
      } else {
          socket.leave(rooms);
      }
  });

  socket.on('disconnect', function () {
      console.log('User disconnected. %s. Socket id %s', socket.id);
  });

  feed.start(function(room, type, message) {
      io.to(room).emit(type, message);
  });
});


  server.listen(port, () => console.log(`Listening on port ${port}`));
  