const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const path = require('path');

const PORT = process.anv.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res)=>{
  res.sendFile('/index.html');
});

io.on('connection', (socket)=>{
  socket.on('connect', ()=>{
    console.log('a user is connected');
    socket.emit('is it work', true);
  });
  socket.on('join', (room, )=>{

  });
  socket.on('disconnect', ()=>{

  });
  socket.on('login game', (e)=>{
    console.log("login id : " + socket.id);
    socket.emit('sendId', socket.id);
  });

  socket.on('move', (x, y, username)=>{
    console.log(`${username} move to (${x}, ${y})`);
    io.emit('move', x, y, username, socket.id);
  });
});



http.listen(PORT, ()=>{
  console.log(`server is open at ${PORT}`);
});
