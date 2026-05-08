export function intersects(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export function resolvePlatforms(entity, platforms) {
  entity.grounded = false;

  for (const platform of platforms) {
    if (!intersects(entity, platform)) continue;

    const fromTop = entity.prevY + entity.h <= platform.y;
    const fromBottom = entity.prevY >= platform.y + platform.h;
    const fromLeft = entity.prevX + entity.w <= platform.x;
    const fromRight = entity.prevX >= platform.x + platform.w;

    if (fromTop && entity.vy >= 0) {
      entity.y = platform.y - entity.h;
      entity.vy = 0;
      entity.grounded = true;
    } else if (fromBottom && entity.vy < 0) {
      entity.y = platform.y + platform.h;
      entity.vy = 0;
    } else if (fromLeft && entity.vx > 0) {
      entity.x = platform.x - entity.w;
      entity.vx = 0;
    } else if (fromRight && entity.vx < 0) {
      entity.x = platform.x + platform.w;
      entity.vx = 0;
    }
  }
}
