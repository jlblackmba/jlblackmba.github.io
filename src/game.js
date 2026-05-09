import { Collectible } from "./entities/Collectible.js";
import { Enemy } from "./entities/Enemy.js";
import { Player } from "./entities/Player.js";
import { intersects, resolvePlatforms } from "./physics.js";
import { deathMessages } from "./deathMessageData.js";

const messages = {
  intro: "Find the deploy gate",
  coffee: "+1 focus",
  zyn: "+1 nicotine clarity",
  win: "Deployed on Friday. Bold.",
};

export class Game {
  constructor(canvas, input, hud, overlay, startButton, levels = [], sounds = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.input = input;
    this.hud = hud;
    this.overlay = overlay;
    this.startButton = startButton;
    this.levels = levels;
    this.sounds = sounds;
    this.levelIndex = 0;
    this.deathMessageIndex = 0;
    this.state = "menu";
    this.cameraX = 0;
    this.lastTime = 0;
    this.messageTimer = 0;
    this.resizeCanvas();

    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(this.canvas);
  }

  loadLevel(level) {
    if (Number.isInteger(level)) {
      this.levelIndex = clamp(level, 0, this.levels.length - 1);
      this.level = this.levels[this.levelIndex];
    } else {
      this.level = level;
      this.levelIndex = Math.max(0, this.levels.indexOf(level));
    }

    this.player = new Player(this.level.playerStart);
    this.enemies = this.level.enemies.map((enemy) => new Enemy(enemy));
    this.collectibles = this.level.collectibles.map((item) => new Collectible(item));
    this.collected = 0;
    this.collectedCoffee = 0;
    this.collectedZyn = 0;
    this.setMessage(messages.intro, 0);
    this.syncHud();
    this.resizeCanvas();
  }

  startLoop() {
    requestAnimationFrame((time) => this.loop(time));
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    const cssWidth = Math.max(1, Math.round(rect.width));
    const cssHeight = Math.max(1, Math.round(rect.height));
    const levelHeight = this.level ? this.level.height : 540;
    const height = Math.max(levelHeight, cssHeight);
    const width = Math.max(320, Math.round(cssWidth * (height / cssHeight)));

    if (this.canvas.width === width && this.canvas.height === height) return;

    this.canvas.width = width;
    this.canvas.height = height;
    this.cameraX = clamp(
      this.player ? this.player.x + this.player.w / 2 - this.canvas.width * 0.38 : 0,
      0,
      this.level ? Math.max(0, this.level.width - this.canvas.width) : 0,
    );
  }

  start() {
    if (this.state === "won" && this.hasNextLevel()) {
      this.loadLevel(this.levelIndex + 1);
    } else if (this.state === "won" || this.state === "lost") {
      this.loadLevel(this.levelIndex);
    }

    this.state = "playing";
    this.overlay.classList.remove("is-visible");
    this.input.clearTransient();
    this.sounds?.start();
  }

  restart() {
    this.loadLevel(this.level);
    this.start();
  }

  loop(time) {
    const dt = Math.min((time - this.lastTime) / 1000 || 0, 1 / 30);
    this.lastTime = time;

    this.update(dt);
    this.draw(time / 1000);

    requestAnimationFrame((nextTime) => this.loop(nextTime));
  }

  update(dt) {
    if (this.input.consume("restart")) {
      this.restart();
    }

    if (this.state !== "playing") return;

    const playerEvents = this.player.update(this.input, dt);
    if (playerEvents.jumped) this.sounds?.jump();
    resolvePlatforms(this.player, this.level.platforms);
    this.keepPlayerInLevel();

    this.enemies.forEach((enemy) => enemy.update(dt));
    this.checkCollectibles();
    this.checkDanger();
    this.checkGoal();

    this.cameraX = clamp(
      this.player.x + this.player.w / 2 - this.canvas.width * 0.38,
      0,
      Math.max(0, this.level.width - this.canvas.width),
    );

    if (this.messageTimer > 0) {
      this.messageTimer -= dt;
      if (this.messageTimer <= 0) this.setMessage(messages.intro, 0);
    }

    this.syncHud();
  }

  keepPlayerInLevel() {
    this.player.x = clamp(this.player.x, 0, this.level.width - this.player.w);
    if (this.player.y > this.level.height + 120) {
      this.fail(this.getDeathMessage("fall"));
    }
  }

  checkCollectibles() {
    for (const item of this.collectibles) {
      if (item.collected || !intersects(this.player, item)) continue;
      item.collected = true;
      this.collected += 1;
      if (item.type === "zyn") {
        this.collectedZyn += 1;
        this.setMessage(messages.zyn, 1.2);
      } else {
        this.collectedCoffee += 1;
        this.setMessage(messages.coffee, 1.2);
      }
      this.sounds?.coffee();
    }
  }

  checkDanger() {
    for (const enemy of this.enemies) {
      if (intersects(this.player, enemy)) {
        this.fail(this.getDeathMessage(enemy.type === "ticket" ? "ticket" : "bug"));
        return;
      }
    }

    for (const hazard of this.level.hazards) {
      if (intersects(this.player, hazard)) {
        this.fail(this.getDeathMessage("hazard"));
        return;
      }
    }
  }

  checkGoal() {
    if (!intersects(this.player, this.level.goal)) return;
    this.state = "won";
    this.setMessage(messages.win, 0);
    this.sounds?.win();
    this.showOverlay(
      "Sprint Complete",
      "You reached the deploy gate with " +
        this.collectedCoffee +
        " coffee and " +
        this.collectedZyn +
        " Zyn.",
      this.hasNextLevel() ? "Next Sprint" : "Restart Quest",
    );
  }

  fail(reason) {
    this.setMessage(reason, 0);
    this.sounds?.fail();
    this.showOverlay("Rollback Required", reason + " Try the sprint again?", "Restart Sprint");
    this.state = "lost";
  }

  showOverlay(title, body, buttonLabel) {
    this.overlay.querySelector("h2").textContent = title;
    this.overlay.querySelector("p").textContent = body;
    this.startButton.textContent = buttonLabel;
    this.overlay.classList.add("is-visible");
  }

  hasNextLevel() {
    return this.levelIndex < this.levels.length - 1;
  }

  getDeathMessage(type) {
    const messagesForType = deathMessages[type] || deathMessages.bug;
    const message = messagesForType[this.deathMessageIndex % messagesForType.length];
    this.deathMessageIndex += 1;
    return message;
  }

  setMessage(message, duration) {
    this.message = message;
    this.messageTimer = duration;
  }

  syncHud() {
    this.hud.levelName.textContent = this.level.name;
    const totalCoffee = this.collectibles.filter((item) => item.type === "coffee").length;
    const totalZyn = this.collectibles.filter((item) => item.type === "zyn").length;
    this.hud.coffee.textContent = `Coffee ${this.collectedCoffee}/${totalCoffee} | Zyn ${this.collectedZyn}/${totalZyn}`;
    this.hud.status.textContent = this.message;
  }

  draw(time) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground(ctx);

    ctx.save();
    ctx.translate(-this.cameraX, 0);

    this.drawGoal(ctx, this.level.goal, time);
    this.level.platforms.forEach((platform) => this.drawPlatform(ctx, platform));
    this.level.hazards.forEach((hazard) => this.drawHazard(ctx, hazard, time));
    this.collectibles.forEach((item) => item.draw(ctx, time));
    this.enemies.forEach((enemy) => enemy.draw(ctx));
    this.player.draw(ctx);

    ctx.restore();
  }

  drawBackground(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, "#86dbff");
    gradient.addColorStop(0.72, "#d9f7ff");
    gradient.addColorStop(1, "#fff1c6");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = "rgba(255,255,255,0.78)";
    this.drawCloud(ctx, 94 - this.cameraX * 0.16, 92);
    this.drawCloud(ctx, 460 - this.cameraX * 0.11, 64);
    this.drawCloud(ctx, 820 - this.cameraX * 0.18, 118);

    ctx.fillStyle = "rgba(35, 54, 79, 0.08)";
    for (let x = -80; x < this.canvas.width + 120; x += 180) {
      ctx.fillRect(x - (this.cameraX * 0.32) % 180, 438, 110, 48);
    }
  }

  drawCloud(ctx, x, y) {
    ctx.fillRect(x, y + 18, 86, 22);
    ctx.fillRect(x + 18, y + 4, 34, 34);
    ctx.fillRect(x + 48, y + 10, 28, 28);
  }

  drawPlatform(ctx, platform) {
    ctx.fillStyle = platform.theme === "ground" ? "#59b86c" : "#8ccf69";
    ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
    ctx.fillStyle = "#23364f";
    ctx.fillRect(platform.x, platform.y, platform.w, 6);
    ctx.fillStyle = "rgba(255,255,255,0.24)";
    ctx.fillRect(platform.x + 8, platform.y + 9, Math.max(0, platform.w - 16), 4);
  }

  drawHazard(ctx, hazard, time) {
    const pulse = Math.sin(time * 10) > 0;
    ctx.fillStyle = pulse ? "#e4574f" : "#f8c654";
    ctx.fillRect(hazard.x, hazard.y, hazard.w, hazard.h);
    ctx.fillStyle = "#23364f";
    ctx.fillRect(hazard.x + 5, hazard.y + 5, hazard.w - 10, 5);
    ctx.fillRect(hazard.x + 12, hazard.y + 15, hazard.w - 24, 4);
  }

  drawGoal(ctx, goal, time) {
    ctx.fillStyle = "#23364f";
    ctx.fillRect(goal.x - 8, goal.y - 12, goal.w + 16, goal.h + 12);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(goal.x, goal.y - 4, goal.w, goal.h);
    ctx.fillStyle = "#2f6fed";
    ctx.fillRect(goal.x + 8, goal.y + 8, goal.w - 16, goal.h - 24);
    ctx.fillStyle = Math.sin(time * 5) > 0 ? "#76d16e" : "#f8c654";
    ctx.fillRect(goal.x + 18, goal.y + 22, goal.w - 36, 12);
    ctx.fillStyle = "#23364f";
    ctx.fillRect(goal.x + 10, goal.y + goal.h - 10, goal.w - 20, 6);
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
