# jlblackmba.github.io
Just a fun game hosted publicly :)

## Dev Quest

Dev Quest is a mobile-first vanilla JavaScript platformer built for GitHub Pages.

You play as a developer trying to collect coffee, dodge bugs and JIRA tickets, and reach the deploy gate before the sprint falls apart.

The game includes a web app manifest, install icons, and a service worker so supported browsers can install it and keep the app shell available offline.

The PWA paths are relative and the service worker scope is `./`, so the same files work when hosted from GitHub Pages at `https://jlblackmba.github.io/`.

## Run locally

Serve the folder with any static file server:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000/`.

## Controls

- Mobile: use the on-screen left, right, and jump buttons.
- Keyboard: use `A`/`D` or arrow keys to move, `Space`/`W`/`Up` to jump, and `R` to restart.
