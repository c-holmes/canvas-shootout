const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// net dimensions
const netWidth = 200;
const netHeight = 50;
const netX = (canvas.width / 2) - (netWidth / 2);
const netY = canvas.height - (20 + netHeight);

// goalie dimension
const goalieWidth = 40;
const goalieHeight = 40;
let goalieX = (canvas.width / 2) - (goalieWidth / 2);
let goalieY = canvas.height - (goalieHeight + netHeight + 30); 
let goalieSpeed = 6;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let lastPressed = [];
let velocity = 0;

// keyhandlers
document.addEventListener('keydown', keydownHandler, false);
document.addEventListener('keyup', keyupHandler, false);

function keydownHandler(e) {
  velocity = goalieSpeed;
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  } else if (e.keyCode === 38) {
    upPressed = true;
  } else if (e.keyCode === 40) {
    downPressed = true;
  }

  lastPressed.unshift(e.keyCode);
}

function keyupHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  } else if (e.keyCode === 38) {
    upPressed = false;
  } else if (e.keyCode === 40) {
    downPressed = false;
  }
}

function drawNet() {
  ctx.beginPath();
  ctx.rect(netX, netY, netWidth, netHeight);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

function drawCrease() {
  ctx.beginPath();
  ctx.arc(canvas.width / 2, netY, netWidth / 1.5, 0, Math.PI, true);
  ctx.closePath();
  ctx.lineWidth = 5;
  ctx.fillStyle = 'transparent';
  ctx.fill();
  ctx.strokeStyle = 'blue';
  ctx.stroke();
}

function drawGoalie() {
  ctx.beginPath();
  ctx.rect(goalieX, goalieY, goalieWidth, goalieHeight);
  ctx.fillStyle = 'green';
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNet();
  drawCrease();
  drawGoalie();
  // console.log(velocity);

  // goalie moving logic - right
  if (rightPressed && goalieX < (canvas.width - goalieWidth)) {
    goalieX += goalieSpeed;
  } else if (lastPressed[0] === 37 && lastPressed[1] === 39 && velocity > 0) {
    velocity = 0;
    goalieX = goalieX;
    console.log('hockey stop');
  } else if (lastPressed[0] === 39 && velocity > 0 && goalieX < (canvas.width-goalieWidth)) {
    goalieX += velocity;
    velocity = velocity - 0.2;
  }

  // goalie moving logic - left
  if (leftPressed && goalieX > 0) {
    goalieX -= goalieSpeed;
  } else if (lastPressed[0] === 39 && lastPressed[1] === 37 && velocity > 0) {
    velocity = 0;
    goalieX = goalieX;
    console.log('hockey stop');
  } else if (lastPressed[0] === 37 && velocity > 0 && goalieX > 0) {
    goalieX -= velocity;
    velocity = velocity - 0.2;
  }

  // goalie moving logic - up
  if (upPressed && goalieY > 0) {
    goalieY -= goalieSpeed;
  } else if (lastPressed[0] === 38 && velocity > 0 && goalieY > 0) {
    goalieY -= velocity;
    velocity = velocity - 0.2;
  }

  // goalie moving logic - down
  if (downPressed && goalieY < (canvas.height-goalieHeight)) {
    goalieY += goalieSpeed;
  } else if (lastPressed[0] === 40 && velocity > 0 && goalieY < (canvas.height-goalieHeight)) {
    goalieY += velocity;
    velocity = velocity - 0.2;
  }

  requestAnimationFrame(draw);
}
// stopping mechanics
// goalie diagonal movement	
// goalie net collision detection

draw();
