const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const box = 20;
canvas.width = 20 * box;
canvas.height = 20 * box;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};

let score = 0;

document.addEventListener("keydown", direction);
document.addEventListener("keydown", startGame);

let d = "RIGHT";
let game;
let isGameOver = false;

function direction(event) {
  if (event.keyCode == 37 && d != "RIGHT") {
    d = "LEFT";
  } else if (event.keyCode == 38 && d != "DOWN") {
    d = "UP";
  } else if (event.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
  } else if (event.keyCode == 40 && d != "UP") {
    d = "DOWN";
  }
}

function startGame() {
  if (!game && !isGameOver) {
    let speed = document.getElementById("speed").value;
    game = setInterval(draw, speed);
  }
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

function blinkSnake() {
  let count = 0;
  const interval = setInterval(() => {
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = count % 2 === 0 ? "#ff0000" : "#000000";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    count++;
    if (count > 5) {
      clearInterval(interval);
      displayGameOver();
    }
  }, 300);
}

function displayGameOver() {
  ctx.fillStyle = "#fff";
  ctx.font = "45px Changa one";
  ctx.fillText("GAME OVER", canvas.width / 4, canvas.height / 2);
}

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "#00ff00" : "#ffffff";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "#000";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    game = null;
    isGameOver = true;
    blinkSnake();
    return;
  }

  snake.unshift(newHead);

  ctx.fillStyle = "#fff";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

document.getElementById("start-button").addEventListener("click", function () {
  resetGame();
  startGame();
});

function resetGame() {
  clearInterval(game);
  game = null;
  d = null;
  isGameOver = false;
  score = 0;
  snake = [];
  snake[0] = { x: 9 * box, y: 10 * box };
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
  };
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
