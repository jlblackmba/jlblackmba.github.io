import { Game } from "./game.js";
import { Input } from "./input.js";
import { sprintPlanning } from "./levels.js";

const canvas = document.querySelector("#game");
const overlay = document.querySelector("#overlay");
const startButton = document.querySelector("#start-button");
const hud = {
  levelName: document.querySelector("#level-name"),
  coffee: document.querySelector("#coffee-count"),
  status: document.querySelector("#status-text"),
};

const input = new Input(document);
const game = new Game(canvas, input, hud, overlay, startButton);

game.loadLevel(sprintPlanning);
game.startLoop();

startButton.addEventListener("click", () => {
  game.start();
});
