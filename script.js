const mainMenu = document.querySelector('.mainMenu');
const optionsBtn = document.querySelector('.optionsBtn');
const optionsBackBtn = document.querySelector('.optionsBackBtn');
const optionsMenu = document.querySelector('.optionsMenu');
const board = document.querySelector('.board');
const startBtn = document.querySelector('.startBtn');
const boardResetBtn = document.querySelector('.boardResetBtn');
const mainMenuBtn = document.querySelector('.mainMenuBtn');

const targetWrap = document.querySelector('.targetWrap');
const targetBtn = document.querySelector('.targetBtn');
const readyBtn = document.querySelector('.readyBtn');
const clock = document.querySelector('.clock');
const startCount = document.querySelector('.startCount');

optionsBtn.onclick = () => {
  optionsMenu.classList.toggle('show');
};
optionsBackBtn.onclick = () => {
  optionsMenu.classList.toggle('show');
};

startBtn.onclick = () => {
  mainMenu.classList.toggle('hide');
  board.classList.toggle('show');
};
mainMenuBtn.onclick = () => {
  mainMenu.classList.toggle('hide');
  board.classList.toggle('show');
};

boardResetBtn.onclick = resetGame;

// timers
const READY_TIME = 3;
let timer;
let time = null;
let readyTimer;
let readyClock = READY_TIME;

let hiscore = parseFloat(window.localStorage.getItem('hiscore')) || 0;
console.log('hiscore', hiscore);

readyBtn.addEventListener('mouseover', (e) => {
  if (time !== null) return;
  // reset readyClock
  readyReset();
  // readyClock start
  readyTimer = window.setInterval(() => {
    readyClock--;
    startCount.innerHTML = readyClock;
    if (readyClock === 0) {
      window.clearInterval(readyTimer);
      startGame();
    }
  }, 1000);
});
readyBtn.addEventListener('mouseout', () => {
  console.log('mouseout', readyTimer);
  readyReset();
  window.clearInterval(readyTimer);
});
function readyReset() {
  console.log('readyReset', time);
  if (time !== null) return;
  readyClock = READY_TIME;
  startCount.innerHTML = readyClock;
}

// START
let roundCount;

function startGame() {
  console.log('startGame');
  roundCount = TARGET_ROUNDS;
  randomizeTarget();
  targetWrap.style.display = 'block';
  time = 0;
  startCount.innerHTML = time;
  timer = window.setInterval(() => {
    time = Math.round(time * 100 + 1) / 100;
    startCount.innerHTML = time;
  }, 10);
}

// target
const TARGET_RADIUS_MIN = 130;
const TARGET_RADIUS_MAX = 500;
const TARGET_ROUNDS = 10;

function randomizeTarget() {
  const randomRotation = Math.random() * 360;
  const randomRadius = Math.round(
    Math.random() * (TARGET_RADIUS_MAX - TARGET_RADIUS_MIN) + TARGET_RADIUS_MIN,
  );

  targetWrap.style.transform = `rotate(${randomRotation}deg)`;
  targetBtn.style.top = `${randomRadius}px`;
  console.log('randomizedTarget', randomRadius, randomRotation);
}

targetBtn.addEventListener('click', () => {
  roundCount--;
  if (roundCount === 0) {
    stopGame(true);
  } else {
    randomizeTarget();
  }
});

function stopGame(finished) {
  console.log('stopGame', timer);
  targetWrap.style.display = 'none';
  window.clearInterval(timer);
  if (time < hiscore && finished) {
    hiscore = time;
    window.localStorage.setItem('hiscore', time);
    alert('New Hiscore!\n' + hiscore);
  }
}
function resetGame() {
  console.log('resetGame');
  time = null;
  stopGame();
  readyReset();
}

// DEBUG
// startBtn.click();
