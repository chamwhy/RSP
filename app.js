const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const path = require('path');

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res)=>{
  res.sendFile('/index.html');
});

io.on('connection', (socket)=>{
  socket.on('connect', ()=>{
    console.log('a user is connected');
  });
  socket.on('join', (room, )=>{

  });
  socket.on('disconnect')
});



http.listen(PORT, ()=>{
  console.log(`server is open at ${PORT}`);
});
