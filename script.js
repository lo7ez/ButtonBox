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
let elapsedTime = null;
let readyTimer;
let readyClock = READY_TIME;

let hiscore = parseFloat(window.localStorage.getItem('hiscore')) || 0;

console.log('hiscore', hiscore);

readyBtn.addEventListener('mouseover', (e) => {
  if (elapsedTime !== null) return;
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
  console.log('readyReset', elapsedTime);
  if (elapsedTime !== null) return;
  readyClock = READY_TIME;
  startCount.innerHTML = readyClock;
}

// START
let roundCount;
let startTime;

function startGame() {
  console.log('startGame');
  startTime = Date.now();
  roundCount = TARGET_ROUNDS;
  randomizeTarget();
  targetWrap.style.display = 'block';
  elapsedTime = 0;

  startCount.innerHTML = '00.00';
  timer = window.setInterval(() => {
    const now = Date.now();
    elapsedTime = Math.floor((now - startTime) / 10) / 100;
    startCount.innerHTML = elapsedTime.toFixed(2);
  }, 10);
}

// target
const TARGET_RADIUS_MIN = 130;
const TARGET_RADIUS_MAX = 450;
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
  if ((elapsedTime < hiscore || hiscore === 0) && finished) {
    hiscore = elapsedTime;
    window.localStorage.setItem('hiscore', elapsedTime);
    alert('New Hiscore!\n' + hiscore);
  }
}
function resetGame() {
  console.log('resetGame');
  elapsedTime = null;
  stopGame();
  readyReset();
}

// DEBUG
// startBtn.click();
