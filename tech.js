document.addEventListener("DOMContentLoaded", () => {
  const entries = [
    {
      title: "💻 Innovation in Action",
      image: "tech-images/dap.jpg",
      text: "Growing up, I had a strong aptitude for mathematics. However my overall A-Level results didn’t meet expectations—something that drew criticism from peers. Despite this, I stayed true to my interests. During National Service, a friend introduced me to Python, sparking a passion for programming that led me to explore fields from cybersecurity to automation. It was Data Science and AI, however, that truly resonated with me—combining problem-solving with real-world impact. At SMU, I joined the Business Intelligence & Analytics Club’s Data Associate Programme, where I gained hands-on experience and found a like-minded community. Earning a fully-funded DSTA scholarship to pursue Computer Science was a turning point, affirming my growth. Today, as President of SMU BIA, I continue to learn and pay it forward by guiding others along their own tech journeys.",
      link: "https://github.com/gregleejy",
      linkText: "View my projects here"
    },
    {
      title: "📗 Sharing AI knowledge",
      image: "tech-images/24asia.jpg",
      text: "I’ve always loved breaking down complex concepts. Writing articles has become more than just a way to inform others—it’s a method of self-discipline and reflection. Honestly, I write these pieces to keep myself constantly in check with the latest developments in AI and to reinforce the foundational knowledge I need to explore deeper applications and research. Each article I publish helps me stay connected to the fast-moving landscape of artificial intelligence while sharpening my ability to communicate ideas clearly—an essential skill for anyone pursuing a career in public service. As an aspiring AI engineer, I hope to use this habit not only to grow personally, but to contribute meaningfully to society by making advanced technologies easier to understand, adopt, and trust.",
      link: "https://medium.com/@gregleejiayou",
      linkText: "View my articles here"
    },
    {
      title: "🤖 Code Literacy",
      image: "tech-images/discrete.jpg",
      text: "In my free time, I enjoy tackling coding challenges on platforms like LeetCode—usually with a cup of iced americano by my side. It’s my way of keeping myself engaged, sharpening my problem-solving skills, and staying fluent in reading and understanding code. It’s both relaxing and rewarding—a small habit that helps me grow consistently.",
      link: "https://leetcode.com/u/gregleejy/",
      linkText: "View my leetcode here"
    }
  ];

  let index = 0;

  const entryContainer = document.getElementById("entry-container");
  const nextBtn = document.getElementById("next-entry");
  const prevBtn = document.getElementById('prev-entry');
  const music = document.getElementById("tech-music");
  const toggleBtn = document.getElementById("toggle-music");
  const introScreen = document.getElementById("intro-screen");
  const techJourney = document.getElementById("tech-journey");

  function updateEntry() {
    const entry = entries[index];

    entryContainer.innerHTML = `
      <div class="slide-in entry-box">
        <h2>${entry.title}</h2>
        <img src="${entry.image}" alt="Journey Image" />
        <p>${entry.text}</p>
        <a href="${entry.link}" target="_blank" style="color: aqua;">${entry.linkText}</a>
      </div>
    `;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % entries.length;
    updateEntry();
  });

  prevBtn.addEventListener('click', () => {
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
    updateEntry(); // Show first entry when game starts
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
