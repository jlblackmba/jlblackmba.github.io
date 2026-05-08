export const sprintPlanning = {
  name: "Sprint Planning",
  width: 1680,
  height: 540,
  playerStart: { x: 56, y: 348 },
  platforms: [
    { x: 0, y: 486, w: 1680, h: 54, theme: "ground" },
    { x: 168, y: 398, w: 162, h: 24 },
    { x: 420, y: 330, w: 190, h: 24 },
    { x: 720, y: 390, w: 152, h: 24 },
    { x: 980, y: 316, w: 208, h: 24 },
    { x: 1290, y: 398, w: 180, h: 24 },
  ],
  hazards: [
    { x: 636, y: 462, w: 54, h: 24, label: "merge conflict" },
    { x: 1204, y: 462, w: 54, h: 24, label: "prod fire" },
  ],
  enemies: [
    { type: "bug", x: 354, y: 450, w: 42, h: 34, patrol: 160, speed: 54 },
    { type: "ticket", x: 785, y: 356, w: 38, h: 34, patrol: 96, speed: 38 },
    { type: "bug", x: 1320, y: 364, w: 42, h: 34, patrol: 118, speed: 46 },
  ],
  collectibles: [
    { type: "coffee", x: 222, y: 358 },
    { type: "coffee", x: 492, y: 290 },
    { type: "coffee", x: 1046, y: 276 },
    { type: "coffee", x: 1360, y: 358 },
  ],
  goal: { x: 1560, y: 414, w: 58, h: 72 },
};
