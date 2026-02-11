(() => {

const shadow = document.querySelector('.shadow');
const hint = document.getElementById('hint');
const text = document.getElementById('hiddenText');
const emojiLayer = document.getElementById('emojiHearts');
const fireLayer = document.getElementById('fireworks');

let timer;

// ===== HOVER / TOUCH FUNCTION =====
function moveLight(x, y) {
  shadow.style.setProperty('--x', x + "px");
  shadow.style.setProperty('--y', y + "px");

  hint.classList.add("hidden");
  text.classList.add("show");

  clearTimeout(timer);

  timer = setTimeout(() => {
    hint.classList.remove("hidden");
    text.classList.remove("show");
  }, 4500);
}

// Desktop Hover
window.addEventListener("mousemove", e => {
  moveLight(e.clientX, e.clientY);
});

// Mobile Touch
window.addEventListener("touchmove", e => {
  const t = e.touches[0];
  moveLight(t.clientX, t.clientY);
});

// ===== LIGHTER EMOJI HEARTS =====
const emojis = ["❤️", "💙", "💚", "💜", "💛", "🧡", "🤍", "💖"];

function spawnEmoji() {
  const e = document.createElement("div");
  e.className = "emoji";

  e.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  e.style.left = Math.random() * 100 + "%";
  e.style.fontSize = 14 + Math.random() * 16 + "px";

  emojiLayer.appendChild(e);

  // Keep emoji count low
  if (emojiLayer.children.length > 25) {
    emojiLayer.removeChild(emojiLayer.children[0]);
  }
}

// ===== BIGGER FIREWORKS =====
function createFirework() {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.6;

  for (let i = 0; i < 40; i++) {

    const s = document.createElement("div");
    s.className = "spark";

    s.style.left = x + "px";
    s.style.top = y + "px";

    const angle = Math.random() * 360;
    const dist = Math.random() * 220 + 80;

    s.style.setProperty("--x", Math.cos(angle) * dist + "px");
    s.style.setProperty("--y", Math.sin(angle) * dist + "px");

    const colors = [
      "#ff0",
      "#f0f",
      "#0ff",
      "#0f0",
      "#ff4500",
      "#ff1493",
      "#00ffea",
      "#ff8c00",
      "#7fff00"
    ];

    s.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    fireLayer.appendChild(s);

    setTimeout(() => s.remove(), 1800);
  }
}

// ===== INTERVALS =====
setInterval(spawnEmoji, 1800);      // Less dense emojis
setInterval(createFirework, 1200);  // More frequent fireworks

})();