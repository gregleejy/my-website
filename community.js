document.addEventListener("DOMContentLoaded", () => {
  const entries = [
    {
      title: "🌱 Service Learning",
      image: "side-images/laos.jpg",
      text: "hi",
    },
    {
      title: "⚽ Football Dream",
      image: "side-images/footy.jpg",
      text: "guzzini."
    }
  ];

  let index = 0;

  const entryContainer = document.getElementById("entry-container");
  const nextBtn = document.getElementById("next-entry");
  const prevBtn = document.getElementById("prev-entry");
  const music = document.getElementById("tech-music");
  const toggleBtn = document.getElementById("toggle-music");
  const introScreen = document.getElementById("intro-screen");
  const techJourney = document.getElementById("tech-journey");

  function updateEntry() {
    const entry = entries[index];

    let linksHTML = "";
    if (entry.links && Array.isArray(entry.links)) {
      linksHTML = entry.links.map(link =>
        `<a href="${link.url}" target="_blank" style="color:aqua; display:block; margin-top:8px;">${link.text}</a>`
      ).join("");
    }

    entryContainer.innerHTML = `
    <div class="slide-in entry-box">
      <h2>${entry.title}</h2>
      <img src="${entry.image}" alt="Journey Image" />
      <p>${entry.text}</p>
      ${linksHTML}
    </div>
  `;
  }



  nextBtn.addEventListener("click", () => {
    index = (index + 1) % entries.length;
    updateEntry();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + entries.length) % entries.length;
    updateEntry();
  });

  let musicStarted = false;

  window.addEventListener("click", () => {
    if (!musicStarted) {
      music.play().then(() => {
        toggleBtn.textContent = "🔇 Mute Music";
      }).catch(err => {
        console.warn("Autoplay blocked:", err.message);
        toggleBtn.textContent = "🔊 Play Music";
      });
      musicStarted = true;
    }

    introScreen.style.display = "none";
    techJourney.classList.remove("hidden");
    updateEntry(); // Load first entry
  }, { once: true });

  toggleBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      toggleBtn.textContent = "🔇 Mute Music";
    } else {
      music.pause();
      toggleBtn.textContent = "🔊 Play Music";
    }
  });
});
