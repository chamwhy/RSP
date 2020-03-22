const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const path = require('path');

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
  res.sendFile('/index.html');
});

http.listen(PORT, ()=>{
  console.log(`server is open at ${PORT}`);
});
