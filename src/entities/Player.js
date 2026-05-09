export class Player {
  constructor(start) {
    this.start = { ...start };
    this.w = 34;
    this.h = 50;
    this.reset();
  }

  reset() {
    this.x = this.start.x;
    this.y = this.start.y;
    this.prevX = this.x;
    this.prevY = this.y;
    this.vx = 0;
    this.vy = 0;
    this.grounded = false;
    this.facing = 1;
  }

  update(input, dt) {
    this.prevX = this.x;
    this.prevY = this.y;
    const events = { jumped: false };

    const axis = Number(input.isDown("right")) - Number(input.isDown("left"));
    const acceleration = this.grounded ? 2100 : 1300;
    const friction = this.grounded ? 0.78 : 0.94;
    const maxSpeed = 260;

    if (axis !== 0) {
      this.vx += axis * acceleration * dt;
      this.facing = axis;
    } else {
      this.vx *= friction;
    }

    this.vx = Math.max(-maxSpeed, Math.min(maxSpeed, this.vx));

    if (input.consume("jump") && this.grounded) {
      this.vy = -610;
      this.grounded = false;
      events.jumped = true;
    }

    this.vy += 1650 * dt;
    this.vy = Math.min(this.vy, 920);

    this.x += this.vx * dt;
    this.y += this.vy * dt;
    return events;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.fillStyle = "#23364f";
    ctx.fillRect(8, 14, 21, 30);

    ctx.fillStyle = "#f0b47c";
    ctx.fillRect(9, 0, 18, 18);

    ctx.fillStyle = "#162336";
    ctx.fillRect(7, 0, 22, 7);

    ctx.fillStyle = "#f8c654";
    ctx.fillRect(this.facing > 0 ? 23 : 2, 6, 4, 4);

    ctx.fillStyle = "#76d16e";
    ctx.fillRect(4, 20, 8, 12);
    ctx.fillRect(23, 20, 8, 12);

    ctx.fillStyle = "#19263a";
    ctx.fillRect(9, 44, 8, 6);
    ctx.fillRect(21, 44, 8, 6);
    ctx.restore();
  }
}
