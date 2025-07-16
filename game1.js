document.addEventListener("DOMContentLoaded", () => {
    // Debug: check for required elements
    const missing = [];
    if (!document.getElementById("intro-screen")) missing.push('intro-screen');
    if (!document.getElementById("game-container")) missing.push('game-container');
    if (!document.getElementById("story-text")) missing.push('story-text');
    if (!document.getElementById("choice1")) missing.push('choice1');
    if (!document.getElementById("choice2")) missing.push('choice2');
    if (missing.length) {
        const msg = document.createElement('div');
        msg.style.position = 'fixed';
        msg.style.top = '20px';
        msg.style.left = '20px';
        msg.style.background = 'red';
        msg.style.color = 'white';
        msg.style.padding = '16px';
        msg.style.zIndex = 99999;
        msg.textContent = 'Missing element(s): ' + missing.join(', ');
        document.body.appendChild(msg);
        return;
    }
    // Simple story structure: each node has text, two choices, and next node indices
    const story = [
        {
            text: "Welcome to the lurking man", //0
            image: "game1-images/intro.png",
            choices: [
                { text: "Start game", next: 1 }
            ]
        },
        {
            text: "You step off the bus. The street is empty and quiet.",
            image: "game1-images/1.png",
            choices: [
                { text: "Walk down the alley", next: 2 },
                { text: "Take the main road", next: 3 }
            ]
        },
        {
            text: "The alley is dark. You hear footsteps behind you.",
            image: "game1-images/2.png",
            choices: [
                { text: "Run", next: 4 },
                { text: "Turn around", next: "end" }
            ]
        },
        {
            text: "The main road is well-lit. A car slows down beside you.",
            image: "game1-images/3.png",
            choices: [
                { text: "Ignore the car", next: 5 },
                { text: "Look inside", next: "end" }
            ]
        },
        {
            text: "You run and the footsteps fade. You reach a crossroad.",
            image: "game1-images/4.png",
            choices: [
                { text: "Go left", next: 6 },
                { text: "Go right", next: "end" }
            ]
        },
        {
            text: "The car drives away. You see a shortcut through a park.",
            image: "game1-images/5.png",
            choices: [
                { text: "Take shortcut", next: 7 },
                { text: "Stay on road", next: 8 }
            ]
        },
        {
            text: "The left path is blocked by a fence.",
            image: "game1-images/6.png",
            choices: [
                { text: "Climb the fence", next: "end" },
                { text: "Go back", next: 8 }
            ]
        },
        {
            text: "The park is eerily silent. You see a shadow move.",
            image: "game1-images/7.png",
            choices: [
                { text: "Investigate", next: "end" }, 
                { text: "Hurry through", next: 9 }
            ]
        },
        {
            text: "You stay on the road and pass a convenience store.",
            image: "game1-images/8.png",
            choices: [
                { text: "Go inside", next: 10 },
                { text: "Keep walking", next: 11 }
            ]
        },
        {
            text: "You hurry through the park and reach a playground.",
            image: "game1-images/9.png",
            choices: [
                { text: "Hide in the playground", next: "end" },
                { text: "Keep moving", next: 11 }
            ]
        },
        {
            text: "The store is empty. The clerk looks nervous.",
            image: "game1-images/10.png",
            choices: [
                { text: "Ask for help", next: "end" },
                { text: "Leave the store", next: 11 }
            ]
        },
        {
            text: "You keep walking and see your house in the distance.",
            image: "game1-images/11.png",
            choices: [
                { text: "Run to your house", next: 12 },
                { text: "Look behind you", next: "end" }
            ]
        },
        {
            text: "You sprint to your house. The door is locked.",
            image: "game1-images/12.png",
            choices: [
                { text: "Ring the bell", next: 13 },
                { text: "Check for spare key", next: 14 }
            ]
        },
        {
            text: "Someone opens the door. You're safe!",
            image: "game1-images/13.png",
            choices: [
                { text: "Go inside", next: 15 },
                { text: "Thank them", next: 15 }
            ]
        },
        {
            text: "You find the spare key and unlock the door.",
            image: "game1-images/14.png",
            choices: [
                { text: "Go inside", next: 15 },
                { text: "Look around first", next: "end" }
            ]
        },
        {
            text: "You are finally home, safe and sound. The End.",
            image: "game1-images/safe.png",
            choices: [
                { text: "End Game", next: null },
                { text: "Retry", next: 0 }
            ]
        },
        {
            id: "end",
            text: "Game Over.",
            image: "game1-images/end.png",
            choices: [
                { text: "End Game", next: null },
                { text: "Retry", next: 0 }
            ]
        }
    ];

    const introScreen = document.getElementById("intro-screen");
    const gameContainer = document.getElementById("game-container");
    const storyText = document.getElementById("story-text");
    const choice1 = document.getElementById("choice1");
    const choice2 = document.getElementById("choice2");
    const music = document.getElementById("tech-music");
    const muteBtn = document.getElementById("mute-music-btn");
    const storyImage = document.querySelector(".game-main-image");
    // Mute/unmute music
    muteBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            muteBtn.textContent = "🔇 Mute Music";
        } else {
            music.pause();
            muteBtn.textContent = "🔊 Play Music";
        }
    });

    let currentNode = 0;
    let musicStarted = false;

    function getNodeIndex(idxOrId) {
        if (typeof idxOrId === 'number') return idxOrId;
        if (typeof idxOrId === 'string') {
            return story.findIndex(n => n.id === idxOrId);
        }
        return 0;
    }

    function showNode(idxOrId) {
        if (idxOrId === null) {
            // Hide game, show intro again
            gameContainer.classList.add("hidden");
            introScreen.style.display = "";
            currentNode = 0;
            return;
        }
        const idx = getNodeIndex(idxOrId);
        currentNode = idx;
        const node = story[idx];
        storyText.textContent = node.text;
        // Set image if present
        if (node.image && storyImage) {
            storyImage.src = node.image;
            storyImage.style.display = '';
        } else if (storyImage) {
            storyImage.style.display = 'none';
        }
        // Show/hide and set up choice1
        if (node.choices[0]) {
            choice1.style.display = '';
            choice1.textContent = node.choices[0].text;
            choice1.disabled = false;
        } else {
            choice1.style.display = 'none';
        }
        // Show/hide and set up choice2
        if (node.choices[1]) {
            choice2.style.display = '';
            choice2.textContent = node.choices[1].text;
            choice2.disabled = false;
        } else {
            choice2.style.display = 'none';
        }
    }

    // Start game on intro tap
    introScreen.addEventListener("click", () => {
        introScreen.style.display = "none";
        gameContainer.classList.remove("hidden");
        showNode(0);
        if (!musicStarted) {
            music.play().catch(() => { });
            musicStarted = true;
        }
    });

    choice1.addEventListener("click", () => {
        choice1.disabled = true;
        choice2.disabled = true;
        const next = story[currentNode].choices[0].next;
        if (next === null) {
            window.location.href = "index.html";
        } else {
            showNode(next);
        }
    });
    choice2.addEventListener("click", () => {
        choice1.disabled = true;
        choice2.disabled = true;
        const next = story[currentNode].choices[1].next;
        if (next === null) {
            window.location.href = "index.html";
        } else {
            showNode(next);
        }
    });
});
