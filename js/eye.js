// Constants
const EYE = document.getElementById("eye");
const EYELID = document.getElementById("eyelid");
const EYELID_OPEN_VALUE =
  "M 0,0 V 2048 H 2048 V 0 Z m 1024,448 c 639.9995,0 896,768 896,768 0,0 -384.0004,384 -896,384 -511.99943,0 -896,-384 -896,-384 0,0 256.0007,-768 896,-768 z";
const EYELID_CLOSED_VALUE =
  "M 0,0 V 2048 H 2048 V 0 Z M 1024,1471.8728 C 1674.1332,1471.8728 1920,1216 1920,1216 c 0,0 -384.0004,384 -896,384 -511.9994,0 -896,-384 -896,-384 0,0 266.1344,255.8728 906.1337,255.8728 z";
const MIN_DELAY_MS = 8000;
const MAX_DELAY_MS = 20000;
const OPEN_DURATION_MS = 200;
const CLOSED_DURATION_MS = 100;
const DOUBLE_BLINK_CHANCE = 0.3;

// Variables
let userHolding = false;

// Functions
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function eyeOpen(duration = OPEN_DURATION_MS) {
  EYELID.style.transition = `d ${duration}ms ease-in-out`;
  EYELID.setAttribute("d", EYELID_OPEN_VALUE);
}

function eyeClose(duration = CLOSED_DURATION_MS) {
  EYELID.style.transition = `d ${duration}ms ease-out`;
  EYELID.setAttribute("d", EYELID_CLOSED_VALUE);
}

function eyeBlink() {
  if (userHolding) return;
  setTimeout(() => {
    eyeClose();
    setTimeout(() => {
      eyeOpen();
    }, OPEN_DURATION_MS);
  }, CLOSED_DURATION_MS);
}

async function eyeRandomBlink() {
  while (true) {
    let delay = Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS) + MIN_DELAY_MS;
    await sleep(delay);
    eyeBlink();
    if (Math.random() < DOUBLE_BLINK_CHANCE) {
      await sleep(CLOSED_DURATION_MS + OPEN_DURATION_MS);
      eyeBlink();
    }
  }
}

function clickEye() {
  userHolding = true;
  eyeClose();
}

function releaseEye() {
  if (userHolding) {
    userHolding = false;
    eyeOpen();
  }
}

// EventListeners
EYE.addEventListener("mousedown", clickEye);
EYE.addEventListener("mouseup", releaseEye);
EYE.addEventListener("mouseleave", releaseEye);
EYE.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    clickEye();
  },
  { passive: false },
);
EYE.addEventListener("touchend", releaseEye);
EYE.addEventListener("touchcancel", releaseEye);

// Entrypoint
eyeClose(0);
eyeBlink();
eyeRandomBlink();
