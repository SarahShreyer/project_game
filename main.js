const canvasField = document.getElementById("canvas_field");
const ctx = canvasField.getContext("2d");
const headSnake = document.getElementById("headSnake");
const deadHead = document.getElementById("deadHead");
const bodySnake = document.getElementById("bodySnake");
const eatingHead = document.getElementById("eatingSnake");
const food = document.getElementById('food');
const scoreCount = document.getElementById('score');
const pauseBtn = document.getElementById('pauseBtn');
const restartGame = document.getElementById('restartBtn');
const gamePause = document.getElementById('gamePause');
const fieldHeight = canvasField.height;
const fieldWidth = canvasField.width;
const snakeHeight = 64;
const snakeWidth = 64;

let directionChanged = false

let direction = null;
const step = 64;
let gameOver = false ;
let pause = false ;

let xFood ;
let yFood ;
let snake = [];
snake.push({
  x: 448,
  y: 320
})

let score = 0;

pauseBtn.onclick =()=>{
  pause = !pause;
  if(pause){
    gamePause.style.display = 'block';
  }else{
    gamePause.style.display = 'none';
  }
  render();
}

restartGame.onclick =()=>{
  snake = [{
      x: 448,
      y: 320
  }];
  direction = null;
  xFood = undefined;
  yFood = undefined;
  score = 0;
  scoreCount.innerHTML = 0;
  if(gameOver){
    gameOver = false;
    render()
  }

  foodRandomizer();
}

document.body.onkeydown = (ev)=>{
  if(pause) return ;
  switch(ev.keyCode){
    case 37://left
      if(direction != "right" && !directionChanged){
        direction = "left";
        directionChanged = true
      }
    break;
    case 38://up
      if(direction != "down" && !directionChanged){
        direction = "up";
        directionChanged = true
      }
    break;
    case 39://right
      if(direction != "left" && !directionChanged){
        direction = "right";
        directionChanged = true
      }
    break;
    case 40://down
      if(direction != "up" && !directionChanged){
        direction = "down";
        directionChanged = true
      }
    break;
    default:
    break;
  }
}
function drawSnake(){
  for(let i= snake.length-1; i >= 0; i--){
    const eating = (snake[i].x-snakeWidth == xFood && snake[i].y-snakeHeight == yFood) ? eatingHead : headSnake;
    const head = gameOver ? deadHead : eating;
    const image = i == 0 ? head : bodySnake;  
    ctx.drawImage(image,snake[i].x-snakeWidth,snake[i].y-snakeHeight);
  }
}
function render(){
  directionChanged = false
  if(gameOver){
    ctx.clearRect(0,0,fieldWidth,fieldHeight);
    drawSnake();
    alert('GAME OVER! YOU LOOSE :((');
    return
  }
  ctx.clearRect(0,0,fieldWidth,fieldHeight);
  move();
  drawFood();
  drawSnake();
  dinner();
  if(!pause){
  setTimeout(render,200);
  }
  if(score == 96){
    alert('YOU WIN! ^-^')
  }
}

function move(){
    switch (direction) {
      case "left":
        snake.unshift({
          x: snake[0].x -step,
          y: snake[0].y
        })
        snake.pop();      
        break;
      case "up":
        snake.unshift({
          x: snake[0].x ,
          y: snake[0].y - step
        })
        snake.pop(); 
        break;
      case "right":
        snake.unshift({
          x: snake[0].x +step,
          y: snake[0].y
        })
        snake.pop(); 
        break;
      case "down":
        snake.unshift({
          x: snake[0].x ,
          y: snake[0].y + step
        })
        snake.pop(); 
      break;   
      default:
        break;
    }
    if(snake[0].x > fieldWidth){
      snake[0].x = snakeWidth;
    }
    if(snake[0].x  <= 0 ){
      snake[0].x  = fieldWidth ;
    }
    if(snake[0].y > fieldHeight){
      snake[0].y = snakeHeight;
    }
    if(snake[0].y <= 0){
      snake[0].y = fieldHeight;
    }
    for(let i=1;i < snake.length; i++){
      if(snake[i].x == snake[0].x && snake[i].y == snake[0].y ){
        gameOver = true;
      } 

    }
}

function drawFood(){
  ctx.drawImage(food,xFood,yFood);
}


function foodRandomizer(){
  xFood = getRandomInt(0,(fieldWidth/64)-1)*64;
  yFood = getRandomInt(0,(fieldHeight/64)-1)*64;
  for(let i=0; i<snake.length; i++){
    if(snake[i].x-snakeWidth == xFood && snake[i].y-snakeHeight == yFood){
      foodRandomizer();
      break;
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function dinner(){
  if( snake[0].x-snakeWidth == xFood && snake[0].y-snakeHeight == yFood){
    score++;
    scoreCount.innerHTML = score;
    foodRandomizer();
    snake.push({
      x: snake[snake.length-1].x,
      y: snake[snake.length-1].y
    });
  }

}

drawSnake();
foodRandomizer();

render();
