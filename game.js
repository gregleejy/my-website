const ironman = document.getElementById("ironman");
const obstacle = document.getElementById("obstacle");
const obstacleImages = [
  "brainrot-images/tralalelo.jpeg",
  "brainrot-images/chimpanzini.jpeg",
  "brainrot-images/sahur.jpg",
  "brainrot-images/guzzini.jpeg",
  "brainrot-images/bombardiro.jpeg"
];

function setRandomObstacleImage() {
  const randomIndex = Math.floor(Math.random() * obstacleImages.length);
  obstacle.src = obstacleImages[randomIndex];
}

const scoreDisplay = document.getElementById("score");

let score = 0;
let jumping = false;
let musicStarted = false;
const randomIndex = Math.floor(Math.random() * obstacleImages.length);
obstacle.src = obstacleImages[randomIndex];
setRandomObstacleImage(); // Set initial image
obstacle.addEventListener("animationiteration", () => {
  if (!gameOver) {
    setRandomObstacleImage();
  }
});
let gameOver = false;

// Background music
const music = new Audio("music/brainrot.mp3");
music.loop = true;

function jump() {
  if (jumping || gameOver) return;
  jumping = true;
  ironman.style.bottom = "200px"; // or more, test to match obstacle height
  setTimeout(() => {
    ironman.style.bottom = "40px";
    jumping = false;
  }, 500);
}

function checkCollision() {
  const ironmanRect = ironman.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  const overlapX = ironmanRect.right - 10 > obstacleRect.left && ironmanRect.left + 10 < obstacleRect.right;
  const overlapY = ironmanRect.bottom - 5 > obstacleRect.top && ironmanRect.top + 5 < obstacleRect.bottom;


  if (overlapX && overlapY) {
    endGame();
  }
}


function updateScore() {
  if (!gameOver) {
    score++;
    scoreDisplay.textContent = score;
  }
}

function endGame() {
  gameOver = true;
  music.pause();

  // Stop the obstacle
  obstacle.style.animation = 'none';
  obstacle.style.left = obstacle.getBoundingClientRect().left + 'px';

  alert("Game Over! Your score: " + score);
  const restart = confirm("Would you like to play again?");
  if (restart) {
    location.reload();
  }
}

// Jump on spacebar or click
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

window.addEventListener("click", () => {
  jump();
  if (!musicStarted) {
    music.play().catch(err => console.warn("Autoplay blocked:", err.message));
    musicStarted = true;
  }
});

// Game loop
setInterval(() => {
  if (!gameOver) {
    checkCollision();
  }
}, 20);

setInterval(() => {
  if (!gameOver) {
    updateScore();
  }
}, 1000);
