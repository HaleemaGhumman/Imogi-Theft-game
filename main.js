const gameArea = document.getElementById('gameArea');
const scoreEl = document.getElementById('score');
const emojis = ['🐱', '🐶', '🐸', '🤑', '👻', '🦊', '👽', '🤖', '🥷'];
const targetEmoji = '🥷';
let score = 0;

function createEmoji() {
  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * 90 + '%';

  emoji.addEventListener('click', () => {
    if (emoji.innerText === targetEmoji) {
      score++;
      scoreEl.innerText = score;
    }
    emoji.remove();
  });

  gameArea.appendChild(emoji);

  setTimeout(() => {
    if (emoji.parentElement) {
      emoji.remove();
    }
  }, 3000);
}

setInterval(createEmoji, 1000);
