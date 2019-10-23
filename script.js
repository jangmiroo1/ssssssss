const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const size = Math.round(canvas.width / 50);
const xEnd = Math.round(canvas.width / size) * size;
const yEnd = Math.round(canvas.height / size) * size;
let directionLock = false;

// States
const snake = [{x: 0, y: 0}];
const apple = {};

const blue1 = {};
const blue2 = {};
const blue3 = {};
const blue4 = {};
const blue5 = {};
const blue6 = {};
const blue7 = {};
const blue8 = {};
const blue9 = {};
const blue10 = {};

const orange1 = {};
const orange2 = {};
const orange3 = {};

let direction = 'right';
let speed = 200;

var count=0;

function random (min, max) {
  return Math.random() * (max - min) + min;
}
 
function setApple() {
  apple.x = Math.round(random(size, canvas.width - size) / size) * size;
  apple.y = Math.round(random(size, canvas.height - size) / size) * size;
}

function setBlue() {
  for(var i=1; i<=10; i++) {
    eval("blue"+i).x = Math.round(random(size, canvas.width - size) / size) * size;
    eval("blue"+i).y = Math.round(random(size, canvas.height - size) / size) * size;
  }
}

function setOrange() {
  for(var i=1; i<=3; i++) {
    eval("orange"+i).x = Math.round(random(size, canvas.width - size) / size) * size;
    eval("orange"+i).y = Math.round(random(size, canvas.height - size) / size) * size;
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, size, size); 
  
  for(var i=1; i<=10; i++) {
  context.fillStyle = 'blue';
  context.fillRect(eval("blue"+i).x, eval("blue"+i).y, size, size);
  }

  for(var i=1; i<=3; i++) {
  context.fillStyle = 'orange';
  context.fillRect(eval("orange"+i).x, eval("orange"+i).y, size, size); 
  }

  for (let i = 0; i < snake.length; i += 1){
    const s = snake[i];
    context.fillStyle = '#fff';
    context.fillRect(s.x, s.y, size, size);
  }

  window.requestAnimationFrame(draw);
}

function tick() {
  for (let i=snake.length-1; i>=0; i--) {
    if (i === 0 && snake[i].x === apple.x && snake[i].y === apple.y) {
      snake.push({});
      speed *= 0.99;
      setApple();
      count = count + 100;
    }

    const s = snake[i];
    if (i == 0) {
      switch(direction) {
        case 'right':
          if (s.x > canvas.width) s.x = 0;
          else s.x += size;
          break;
        case 'down':
          if (s.y > canvas.height) s.y = 0;
          else s.y += size;
          break;
        case 'left':
          if (s.x < 0) s.x = xEnd;
          else s.x -= size;
          break;
        case 'up':
          if (s.y < 0) s.y = yEnd;
          else s.y -= size;
      }

      for (let j = 1; j <= 10; j++) {
        if (snake[0].x === eval("blue"+j).x && snake[0].y === eval("blue"+j).y) {
          alert('GAME OVER');
          window.location.reload();
        }
      }

      for (let j = 1; j < snake.length; j += 1) {
        if (snake[0].x === snake[j].x && snake[0].y === snake[j].y) {
          alert('GAME OVER');
          window.location.reload();
        }
      }

      for (let j = 1; j <= 3; j++) {
        if (snake[0].x === eval("orange"+j).x && snake[0].y === eval("orange"+j).y) {
          if (snake.length > 1) {
          snake.splice(snake.length-1, 1);
          // speed = speed * 0.99;
          setOrange();
          }
        }
      }



    } else {
      snake[i].x = snake[i-1].x;
      snake[i].y = snake[i-1].y;
    }
  }
  window.setTimeout(tick, speed);
  directionLock = false;
}

function onKeyDown(e) {
  if (!directionLock) {
    directionLock = true;
    const newDirection = e.key.substr(5).toLowerCase();

    if (direction === 'left' && newDirection !== 'right') direction = newDirection;
    if (direction === 'up' && newDirection !== 'down') direction = newDirection;
    if (direction === 'down' && newDirection !== 'up') direction = newDirection;
    if (direction === 'right' && newDirection !== 'left') direction = newDirection;
  }
}

setApple();
setBlue();
setOrange();
window.addEventListener('keydown', onKeyDown);
window.setTimeout(tick, speed);
window.requestAnimationFrame(draw);

document.getElementById('score').innerHTML = "score : " + count;