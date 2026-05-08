const keyMap = new Map([
  ["ArrowLeft", "left"],
  ["KeyA", "left"],
  ["ArrowRight", "right"],
  ["KeyD", "right"],
  ["ArrowUp", "jump"],
  ["KeyW", "jump"],
  ["Space", "jump"],
  ["KeyR", "restart"],
]);

export class Input {
  constructor(root) {
    this.actions = new Set();
    this.pressed = new Set();

    root.addEventListener("keydown", (event) => this.onKey(event, true));
    root.addEventListener("keyup", (event) => this.onKey(event, false));

    document.querySelectorAll("[data-action]").forEach((button) => {
      const action = button.dataset.action;
      const activate = (event) => {
        event.preventDefault();
        this.actions.add(action);
        this.pressed.add(action);
        button.classList.add("is-active");
      };
      const release = (event) => {
        event.preventDefault();
        this.actions.delete(action);
        button.classList.remove("is-active");
      };

      button.addEventListener("pointerdown", activate);
      button.addEventListener("pointerup", release);
      button.addEventListener("pointercancel", release);
      button.addEventListener("pointerleave", release);
    });
  }

  onKey(event, isDown) {
    const action = keyMap.get(event.code);
    if (!action) return;

    event.preventDefault();
    if (isDown) {
      this.actions.add(action);
      this.pressed.add(action);
    } else {
      this.actions.delete(action);
    }
  }

  isDown(action) {
    return this.actions.has(action);
  }

  consume(action) {
    const wasPressed = this.pressed.has(action);
    this.pressed.delete(action);
    return wasPressed;
  }

  clearTransient() {
    this.pressed.clear();
  }
}
