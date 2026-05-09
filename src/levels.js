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

export const qaGauntlet = {
  name: "QA Gauntlet",
  width: 1960,
  height: 540,
  playerStart: { x: 56, y: 348 },
  platforms: [
    { x: 0, y: 486, w: 360, h: 54, theme: "ground" },
    { x: 500, y: 486, w: 280, h: 54, theme: "ground" },
    { x: 900, y: 486, w: 320, h: 54, theme: "ground" },
    { x: 1410, y: 486, w: 550, h: 54, theme: "ground" },
    { x: 170, y: 396, w: 150, h: 24 },
    { x: 430, y: 326, w: 150, h: 24 },
    { x: 720, y: 374, w: 132, h: 24 },
    { x: 1010, y: 310, w: 178, h: 24 },
    { x: 1300, y: 394, w: 154, h: 24 },
    { x: 1568, y: 326, w: 178, h: 24 },
  ],
  hazards: [
    { x: 370, y: 508, w: 104, h: 32, label: "flaky test gap" },
    { x: 800, y: 508, w: 84, h: 32, label: "broken build" },
    { x: 1228, y: 508, w: 154, h: 32, label: "scope creep" },
  ],
  enemies: [
    { type: "ticket", x: 220, y: 362, w: 38, h: 34, patrol: 96, speed: 44 },
    { type: "bug", x: 580, y: 450, w: 42, h: 34, patrol: 156, speed: 64 },
    { type: "ticket", x: 1060, y: 276, w: 38, h: 34, patrol: 88, speed: 46 },
    { type: "bug", x: 1502, y: 450, w: 42, h: 34, patrol: 160, speed: 58 },
  ],
  collectibles: [
    { type: "coffee", x: 226, y: 356 },
    { type: "coffee", x: 490, y: 286 },
    { type: "coffee", x: 760, y: 334 },
    { type: "coffee", x: 1076, y: 270 },
    { type: "coffee", x: 1628, y: 286 },
  ],
  goal: { x: 1834, y: 414, w: 58, h: 72 },
};

export const levels = [sprintPlanning, qaGauntlet];
