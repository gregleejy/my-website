document.addEventListener("DOMContentLoaded", () => {
  const entries = [
    {
      title: "🌱 Service Learning",
      image: "side-images/laos.jpg",
      text: "As a child, I believed I wanted to become an educator. In hindsight, it wasn’t the profession itself that drew me in. It was the fulfilment I felt from engaging with others. That same passion has guided me through various community efforts, including overseas service projects, grassroots involvement, and volunteer teaching initiatives. Over time, I’ve come to understand the deeper value of these experiences. It’s not about “helping” others from a place of superiority, but about engaging in mutual learning—what we call service learning. Everyone has something to teach, and something to learn. These moments of exchange have not only given me memories to cherish, but also taught me how to collaborate with people from all walks of life.",
    },
    {
      title: "⚽ Football Dream",
      image: "side-images/footy.jpg",
      text: "I started playing football at 13, joining weekly Sunday games with my brothers whom I’ve admired growing up. Their influence inspired me to push myself competitively. At 16, I suffered my first MCL tear and kneecap dislocation, but with consistent rehab, I recovered and earned a spot on the RI football team at 17, eventually becoming vice-captain. Unfortunately, COVID-19 cancelled all tournaments that year. Later on I continued chasing the competitive dream by joining a Singapore Islandwide League club. However, another injury struck just before my debut. A second MCL tear and kneecap dislocation led to surgery, but I remained committed. During recovery, I attended SMU football trials and was fortunate to make the team. I'm now preparing for my first appearance in SUNIG. Along the way, I’ve also contributed off the pitch—coaching at Singapore FC and working with Lion City Sailors FC to support the development of local football.",
      links: [
        {
          url: "https://drive.google.com/drive/folders/1vjJzxdWqQggC5iUM6-pkCp1V5Cw7TA8H?usp=drive_link",
          text: "🎥 Video Highlights"
        },
        {
          url: "https://fminside.net/players/5-fm-243/2000314059-greg-lee",
          text: "🌐 Featured on FMINSIDE.NET"
        },
        {
          url: "https://sortitoutsi.net/football-manager-2025/person/2000314059/greg-lee",
          text: "🌐 Featured on SORTITOUTSI.NET"
        }
      ]
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
