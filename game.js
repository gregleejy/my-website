const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameOverText = document.getElementById("gameOverText");

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

let jumpCount = 0;
const maxJumps = 2;
let activeJump = null;

function jump() {
  if (!gameRunning || jumpCount >= maxJumps) return;
  jumpCount++;

  let position = parseInt(player.style.bottom) || 0;
  let velocity = 10;             // 🚀 visible lift
  const gravity = -0.25;         // ⏳ slow fall
  const hoverTime = 1000;        // 🛸 hover mid-air
  const maxHeight = 300;         // ⛔ optional height cap

  if (activeJump) cancelAnimationFrame(activeJump);

  let isHovering = false;
  let hoverStart = null;

  function animateJump(timestamp) {
    if (!hoverStart) hoverStart = timestamp;

    // Cap max height so Iron Man doesn’t leave screen
    if (position >= maxHeight && velocity > 0) {
      velocity = 0;
    }

    if (!isHovering && velocity <= 0) {
      isHovering = true;
      velocity = 0;
    }

    if (isHovering && timestamp - hoverStart < hoverTime) {
      player.style.bottom = `${Math.round(position)}px`;
      activeJump = requestAnimationFrame(animateJump);
      return;
    }

    if (isHovering && timestamp - hoverStart >= hoverTime) {
      isHovering = false;
      velocity = -0.5;
    }

    position += velocity;
    velocity += gravity;

    if (position <= 0) {
      position = 0;
      jumpCount = 0;
      player.style.bottom = "0px";
      activeJump = null;
      return;
    }

    player.style.bottom = `${Math.round(position)}px`;
    activeJump = requestAnimationFrame(animateJump);
  }

  activeJump = requestAnimationFrame(animateJump);
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
  
