const loadingBar = document.getElementById('loading-bar');
const loadingText = document.getElementById('loading-text');
const loadingMsg = document.getElementById('loading-message');
const loadingScreen = document.getElementById('loading-screen');
const postLoadingUI = document.getElementById('post-loading-ui');
const music = document.getElementById('bg-music');

let percent = 0;

const messages = [
  "Booting Arc Reactor...",
  "Initializing Flight System...",
  "Deploying J.A.R.V.I.S...",
  "Verifying HUD...",
  "Running Suit Diagnostics...",
  "Establishing Comms...",
  "Synchronizing Systems...",
  "Ready for Deployment."
];

let messageIndex = 0;
let messageInterval = setInterval(() => {
  loadingMsg.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
}, 1500);

const loadingInterval = setInterval(() => {
  percent++;
  loadingBar.style.width = percent + '%';
  loadingText.textContent = `Loading: ${percent}%`;

  if (percent >= 100) {
    clearInterval(loadingInterval);
    clearInterval(messageInterval);
    loadingScreen.classList.add('hidden');

    postLoadingUI.style.display = 'flex';
    postLoadingUI.classList.remove('hidden');
    postLoadingUI.classList.add('fade-in');

    const musicBtn = document.getElementById("music-toggle");
    musicBtn.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        musicBtn.textContent = "🔇 Mute Music";
      } else {
        music.pause();
        musicBtn.textContent = "🔊 Play Music";
      }
    });
  }


}, 50);

// 🔊 Autoplay allowed after first user click
window.addEventListener('click', () => {
  if (music.paused) {
    music.play().catch(err => {
      console.warn("Autoplay blocked:", err.message);
    });
  }
}, { once: true });
