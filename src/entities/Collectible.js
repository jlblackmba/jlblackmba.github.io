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

    if (this.type === "zyn") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x + 4, y + 4, 18, 18);
      ctx.fillStyle = "#2f6fed";
      ctx.fillRect(x + 6, y + 6, 14, 14);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x + 9, y + 9, 8, 8);
      ctx.fillStyle = "#23364f";
      ctx.fillRect(x + 11, y + 11, 4, 4);
      return;
    }

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
