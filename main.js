let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameDuration = 30; // seconds
let gameInterval, timerInterval;

const gameArea = document.querySelector('.game-area');
const scoreDisplay = document.querySelector('.score');
const timerDisplay = document.createElement('div');
const highScoreDisplay = document.createElement('div');

timerDisplay.style.marginBottom = '10px';
timerDisplay.style.fontSize = '1.1rem';
highScoreDisplay.style.fontSize = '1rem';

document.body.insertBefore(timerDisplay, gameArea);
document.body.insertBefore(highScoreDisplay, gameArea);

function startGame() {
  score = 0;
  updateScore();
  updateHighScore();
  let timeLeft = gameDuration;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  gameInterval = setInterval(spawnEmoji, 800);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateHighScore() {
  highScoreDisplay.textContent = `High Score: ${highScore}`;
}

function spawnEmoji() {
  const emoji = document.createElement('div');
  emoji.className = 'emoji';
  emoji.textContent = getRandomEmoji();
  emoji.style.left = Math.random() * 90 + '%';
  gameArea.appendChild(emoji);

  emoji.addEventListener('click', () => {
    score++;
    updateScore();
    emoji.remove();
  });

  // Remove emoji after it falls
  setTimeout(() => emoji.remove(), 3000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  // Stop spawning and remove existing emojis
  document.querySelectorAll('.emoji').forEach(e => e.remove());

  // Update high score if necessary
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScore = score;
  }

  // Show Game Over UI
  document.getElementById("final-score").textContent = `Your Score: ${score}`;
  document.getElementById("final-high-score").textContent = `High Score: ${highScore}`;
  document.getElementById("game-over").style.display = "block";
}
function restartGame() {
  document.getElementById("game-over").style.display = "none";
  startGame();
}


function getRandomEmoji() {
  const emojis = ['🍕', '🎈', '🍎', '🚀', '💎', '🎁', '🐱', '⭐', '🍩'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

// Start the game automatically (or you can add a Start button)
startGame();
