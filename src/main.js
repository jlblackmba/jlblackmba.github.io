import { Game } from "./game.js";
import { Input } from "./input.js";
import { sprintPlanning } from "./levels.js";

const canvas = document.querySelector("#game");
const overlay = document.querySelector("#overlay");
const startButton = document.querySelector("#start-button");
const installButton = document.querySelector("#install-button");
const pwaStatus = document.querySelector("#pwa-status");
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

let installPrompt = null;

function syncConnectionStatus() {
  if (!pwaStatus) return;

  pwaStatus.textContent = navigator.onLine ? "Online" : "Offline ready";
  pwaStatus.classList.toggle("is-offline", !navigator.onLine);
}

window.addEventListener("online", syncConnectionStatus);
window.addEventListener("offline", syncConnectionStatus);
syncConnectionStatus();

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) return;

  installButton.hidden = true;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
});

window.addEventListener("appinstalled", () => {
  installPrompt = null;
  installButton.hidden = true;
  pwaStatus.textContent = "Installed";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js", { scope: "./" });
  });
}
