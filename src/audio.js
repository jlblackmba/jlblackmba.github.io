export class SoundBoard {
  constructor() {
    this.context = null;
    this.master = null;
  }

  async resume() {
    const context = this.getContext();
    if (!context) return;
    if (context.state === "suspended") {
      await context.resume();
    }
  }

  start() {
    this.sequence([
      { frequency: 330, type: "square", start: 0, duration: 0.07, volume: 0.05 },
      { frequency: 440, type: "square", start: 0.08, duration: 0.09, volume: 0.05 },
    ]);
  }

  jump() {
    this.tone({ frequency: 260, endFrequency: 620, type: "square", duration: 0.16, volume: 0.04 });
  }

  coffee() {
    this.sequence([
      { frequency: 740, type: "triangle", start: 0, duration: 0.06, volume: 0.05 },
      { frequency: 980, type: "triangle", start: 0.055, duration: 0.08, volume: 0.045 },
    ]);
  }

  fail() {
    this.tone({ frequency: 150, endFrequency: 70, type: "sawtooth", duration: 0.28, volume: 0.055 });
  }

  win() {
    this.sequence([
      { frequency: 392, type: "triangle", start: 0, duration: 0.09, volume: 0.055 },
      { frequency: 523, type: "triangle", start: 0.1, duration: 0.09, volume: 0.055 },
      { frequency: 659, type: "triangle", start: 0.2, duration: 0.16, volume: 0.055 },
    ]);
  }

  sequence(notes) {
    notes.forEach((note) => this.tone(note));
  }

  tone({ frequency, endFrequency = frequency, type, start = 0, duration, volume }) {
    const context = this.getContext();
    if (!context) return;
    const startTime = context.currentTime + start;
    const endTime = startTime + duration;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), endTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(startTime);
    oscillator.stop(endTime + 0.02);
  }

  getContext() {
    if (this.context) return this.context;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;

    this.context = new AudioContext();
    this.master = this.context.createGain();
    this.master.gain.value = 0.45;
    this.master.connect(this.context.destination);
    return this.context;
  }
}
