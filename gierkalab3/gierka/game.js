const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("overlay");
const gameOverSound = document.getElementById("gameOverSound");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const assets = {
  background: new Image(),
  crosshair: new Image(),
  zombie: new Image(),
  heartFull: new Image(),
  heartEmpty: new Image(),
};

assets.background.src = "images/board-bg.jpg";
assets.crosshair.src = "images/aim.png";
assets.zombie.src = "images/walkingdead.png";
assets.heartFull.src = "images/full_heart.png";
assets.heartEmpty.src = "images/empty_heart.png";

let lives = 3;
let score = 0;
let zombies = [];
let isGameOver = false;

const mousePosition = { x: 0, y: 0 };

const zombieSprite = {
  width: 200,
  height: 312,
  frameCount: 10,
};

canvas.style.cursor = "none";

function spawnZombie() {
  const size = Math.random() * 1 + 0.4;
  zombies.push({
    x: canvas.width,
    y: Math.random() * (canvas.height - zombieSprite.height),
    speed: Math.random() * 8 + 0.8,
    scale: size,
    frame: 0,
  });
}

function updateGame() {
  if (isGameOver) return;

  ctx.drawImage(assets.background, 0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 3; i++) {
    const img = i < lives ? assets.heartFull : assets.heartEmpty;
    ctx.drawImage(img, 10 + i * 90, 10, 80, 80);
  }

  ctx.fillStyle = "white";
  ctx.font = "32px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 150, 30);

  zombies.forEach((zombie, index) => {
    zombie.x -= zombie.speed;
    zombie.frame = (zombie.frame + 0.1) % zombieSprite.frameCount;

    if (zombie.x + zombieSprite.width * zombie.scale < 0) {
      zombies.splice(index, 1);
      lives--;
      if (lives <= 0) endGame();
    } else {
      const spriteX = Math.floor(zombie.frame) * zombieSprite.width;
      ctx.drawImage(
        assets.zombie,
        spriteX,
        0,
        zombieSprite.width,
        zombieSprite.height,
        zombie.x,
        zombie.y,
        zombieSprite.width * zombie.scale,
        zombieSprite.height * zombie.scale
      );
    }
  });

  if (Math.random() < 0.02) spawnZombie();

  ctx.drawImage(
    assets.crosshair,
    mousePosition.x - 75,
    mousePosition.y - 75,
    150,
    150
  );

  requestAnimationFrame(updateGame);
}

canvas.addEventListener("click", (event) => {
  if (isGameOver) return;

  const clickX = event.clientX;
  const clickY = event.clientY;

  let hit = false;

  zombies.forEach((zombie, index) => {
    const zombieWidth = zombieSprite.width * zombie.scale;
    const zombieHeight = zombieSprite.height * zombie.scale;

    if (
      clickX >= zombie.x &&
      clickX <= zombie.x + zombieWidth &&
      clickY >= zombie.y &&
      clickY <= zombie.y + zombieHeight
    ) {
      zombies.splice(index, 1);
      score += 20;
      hit = true;
    }
  });

  if (!hit) {
    score -= 5;
  }
});

canvas.addEventListener("mousemove", (event) => {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
});

function endGame() {
  isGameOver = true;
  gameOverSound.play();
  overlay.style.display = "flex";
}

function startGame() {
  lives = 3;
  score = 0;
  zombies = [];
  isGameOver = false;
  overlay.style.display = "none";
  gameOverSound.pause();
  gameOverSound.currentTime = 0;
  updateGame();
}

startGame();
