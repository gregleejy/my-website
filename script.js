console.log("Iron Man is flying!");

const statusText = document.getElementById("status-text");
const messages = [
  "Initializing Arc Reactor...",
  "Engaging Flight Mode...",
  "Target Lock Acquired.",
  "System Diagnostics: Stable",
  "Power Levels at 98%",
  "Mission: Protect the Multiverse",
];

let currentIndex = 0;

setInterval(() => {
  statusText.textContent = messages[currentIndex];
  currentIndex = (currentIndex + 1) % messages.length;
}, 5000);

window.addEventListener('click', () => {
  const music = document.getElementById('bg-music');
  if (music.paused) {
    music.play().catch((err) => {
      console.error("Playback failed:", err);
    });
  }
}, { once: true }); // ensures this only runs once
