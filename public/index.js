alert('start');

class Player{
  constructor(canvas, username){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.username = username;
    this.r = 28;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.dx = 0;
    this.dy = 0;
  }

  moveTo = (x, y)=>{
    this.x = x;
    this.y  = y;
  };

  render = (x, y, username)=>{
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBackground();
    this.drawPlayer(this.x, this.y, username, this.username == username);
  };

  drawBackground = ()=>{
    this.context.fillStyle = '#62cc62';
    this.context.fillRect(0, 0, canvas.width, canvas.height);
  };

  drawPlayer = (x, y, username, isMe)=>{
    this.drawBody(x, y);
    this.drawUsername(x, y, username, isMe);
  }

  drawBody = (x, y)=>{
    this.context.beginPath();
    this.context.arc(x, y, this.r, 0, Math.PI*2, false);
    this.context.fillStyle = '#FFE4C4';
    this.context.fill();
    /*
    this.context.strokeStyle = 'rgba(0, 0, 0, 1)';
    this.context.lineWidth = this.r / 8;
    this.context.stroke();
    */
    this.context.closePath();

  };

  drawUsername = (x, y, username, isMe)=>{
    this.context.font = '15px Impact';
    this.context.fillStyle = isMe ? 'red' : 'black';
    this.context.textAlign = 'center';
    this.context.fillText(username, x, y - this.r*1.5);
  }
}





const socket = io();
let player = new Player(document.getElementById('canvas'), "chamwhy");
let speed = 3;
let interval;

socket.on('connection', ()=>{
  console.log('connected');
});

socket.on('move', (x, y, username)=>{
  console.log(`${username} move to (${x}, ${y})`);
  player.drawPlayer(x, y, username);
});

let keyDownHd = (e)=>{
  if(e.keyCode == 87){
    player.dy = -speed;
  }else if(e.keyCode == 65){
    player.dx = -speed;
  }else if(e.keyCode == 83){
    player.dy = speed;
  }else if(e.keyCode == 68){
    player.dx = speed;
  }
}
let keyUpHd = (e)=>{
  if(e.keyCode == 87){
    player.dy = 0;
  }else if(e.keyCode == 65){
    player.dx = 0;
  }else if(e.keyCode == 83){
    player.dy = 0;
  }else if(e.keyCode == 68){
    player.dx = 0;
  }
}

document.addEventListener('keydown', keyDownHd);
document.addEventListener('keyup', keyUpHd);

alert('draw')



let start = ()=>{
  interval = setInterval(()=>{
    player.moveTo(player.x + player.dx, player.y + player.dy);
    if(player.dx != 0 || player.dy != 0){
      console.log(`${player.username} move to (${player.x}, ${player.y})`);
      socket.emit('move', player.x, player.y, player.username);
    }
    player.render(player.x, player.y, player.username);
  }, 10);
}
let stop = ()=>{
  clearInterval(interval);
}

start();
