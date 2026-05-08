export class Enemy {
  constructor(config) {
    Object.assign(this, config);
    this.startX = config.x;
    this.direction = 1;
  }

  update(dt) {
    this.x += this.direction * this.speed * dt;
    if (Math.abs(this.x - this.startX) >= this.patrol) {
      this.direction *= -1;
      this.x = this.startX + Math.sign(this.x - this.startX) * this.patrol;
    }
  }

  draw(ctx) {
    if (this.type === "ticket") {
      this.drawTicket(ctx);
    } else {
      this.drawBug(ctx);
    }
  }

  drawBug(ctx) {
    ctx.fillStyle = "#23364f";
    ctx.fillRect(this.x, this.y + 10, this.w, this.h - 10);
    ctx.fillStyle = "#79d967";
    ctx.fillRect(this.x + 6, this.y + 4, this.w - 12, this.h - 8);
    ctx.fillStyle = "#111827";
    ctx.fillRect(this.x + 10, this.y + 13, 5, 5);
    ctx.fillRect(this.x + this.w - 15, this.y + 13, 5, 5);
    ctx.fillRect(this.x + 7, this.y + this.h - 5, 7, 5);
    ctx.fillRect(this.x + this.w - 14, this.y + this.h - 5, 7, 5);
  }

  drawTicket(ctx) {
    ctx.fillStyle = "#1c4fb8";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "#8eb6ff";
    ctx.fillRect(this.x + 5, this.y + 7, this.w - 10, 5);
    ctx.fillRect(this.x + 5, this.y + 18, this.w - 16, 5);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.x + 8, this.y + 26, 5, 5);
    ctx.fillRect(this.x + this.w - 13, this.y + 26, 5, 5);
  }
}
