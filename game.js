const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameOverText = document.getElementById("gameOverText");
const isMobile = window.innerWidth <= 768;
const maxHeight = isMobile ? 5 : 500;

let isJumping = false;
let gameRunning = true;
let score = 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let gamesPlayed = parseInt(localStorage.getItem("gamesPlayed")) || 0;

// Create UI elements
const scoreDisplay = document.createElement("div");
const highScoreDisplay = document.createElement("div");
const memoryDisplay = document.createElement("div");

scoreDisplay.id = "scoreDisplay";
highScoreDisplay.id = "highScoreDisplay";
memoryDisplay.id = "memoryDisplay";

scoreDisplay.classList.add("info");
highScoreDisplay.classList.add("info");
memoryDisplay.classList.add("info");

document.body.append(scoreDisplay, highScoreDisplay, memoryDisplay);

function updateDisplays() {
  scoreDisplay.textContent = `Score: ${score}`;
  highScoreDisplay.textContent = `High Score: ${highScore}`;
  memoryDisplay.textContent = `Games Played: ${gamesPlayed}`;
}

function jump() {
  if (isJumping || !gameRunning) return;
  isJumping = true;
  let position = 0;

  const upInterval = setInterval(() => {
    if (position >= maxHeight) {
      clearInterval(upInterval);

      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 7;
          player.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 7;
      player.style.bottom = position + "px";
    }
  }, 20);
}

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    playerRect.right > obstacleRect.left &&
    playerRect.left < obstacleRect.right &&
    playerRect.bottom > obstacleRect.top
  ) {
    gameOver();
  }
}

function gameOver() {
    gameRunning = false;
    gameOverText.style.display = "block";
    obstacle.style.animation = "none";
  
    // Update high score
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
  
    // Update memory/games played
    gamesPlayed += 1;
    localStorage.setItem("gamesPlayed", gamesPlayed);
  
    updateDisplays();
  }
  

function restartGame() {
  score = 0;
  gameRunning = true;
  gameOverText.style.display = "none";
  obstacle.style.left = "100%";
  moveObstacle();
  updateDisplays();
}

function moveObstacle() {
    let position = window.innerWidth;
  
    const obstacleImages = [
      "sahur.jpg",
      "guzzini.jpeg",
      "bombardiro.jpeg",
      "tralalelo.jpeg",
      "chimpanzini.jpeg"
    ];
  
    const interval = setInterval(() => {
      if (!gameRunning) {
        clearInterval(interval);
        return;
      }
  
      if (position < -70) {
        position = window.innerWidth;
        score++;
  
        // Change obstacle image randomly
        const randomIndex = Math.floor(Math.random() * obstacleImages.length);
        obstacle.src = obstacleImages[randomIndex];
      } else {
        position -= 5;
        obstacle.style.left = position + "px";
        checkCollision();
      }
  
      updateDisplays();
    }, 20);
  }
    

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      if (!gameRunning) restartGame();
      jump();
    }
  });
  
document.addEventListener("touchstart", () => {
  if (!gameRunning) restartGame();
  jump();
});

  moveObstacle();
  updateDisplays();
  
