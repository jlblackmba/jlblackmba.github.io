export class Collectible {
  constructor(config) {
    this.type = config.type;
    this.x = config.x;
    this.y = config.y;
    this.w = 26;
    this.h = 28;
    this.collected = false;
    this.floatOffset = Math.random() * Math.PI * 2;
  }

  draw(ctx, time) {
    if (this.collected) return;

    const bob = Math.sin(time * 5 + this.floatOffset) * 4;
    const x = this.x;
    const y = this.y + bob;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + 5, y + 10, 17, 14);
    ctx.fillStyle = "#8a4b2f";
    ctx.fillRect(x + 5, y + 8, 17, 5);
    ctx.fillStyle = "#23364f";
    ctx.fillRect(x + 20, y + 12, 6, 8);
    ctx.fillStyle = "#f8c654";
    ctx.fillRect(x + 8, y, 3, 6);
    ctx.fillRect(x + 15, y + 1, 3, 6);
  }
}
