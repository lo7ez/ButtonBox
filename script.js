const mainMenu = document.querySelector('.mainMenu');
const optionsBtn = document.querySelector('.optionsBtn');
const optionsBackBtn = document.querySelector('.optionsBackBtn');
const optionsMenu = document.querySelector('.optionsMenu');
const darkModeBtn = document.querySelector('.darkModeBtn');

const pageBoard = document.querySelector('.pageBoard');
const board = document.querySelector('.board');
const startBtn = document.querySelector('.startBtn');
const boardResetBtn = document.querySelector('.boardResetBtn');
const mainMenuBtn = document.querySelector('.mainMenuBtn');

const targetWrap = document.querySelector('.targetWrap');
const targetBtn = document.querySelector('.targetBtn');
const readyBtn = document.querySelector('.readyBtn');
const clock = document.querySelector('.clock');
const startCount = document.querySelector('.startCount');

const hiscoreEl = document.querySelector('.hiscore');

optionsBtn.onclick = () => {
  console.log('show');
  optionsMenu.classList.toggle('show');
};

startBtn.onclick = () => {
  mainMenu.classList.toggle('show');
  pageBoard.classList.toggle('show');
};
mainMenuBtn.onclick = () => {
  mainMenu.classList.toggle('show');
  pageBoard.classList.toggle('show');
};

boardResetBtn.onclick = resetGame;

// DARK MODE

darkModeBtn.addEventListener('click', function() {
  console.log('click');
  document.body.classList.toggle('dark-mode');
  mainMenu.classList.toggle('dark-modeMenu');
  optionsMenu.classList.toggle('dark-modeMenu');
  board.classList.toggle('dark-modeMenu');

  if (document.body.classList.contains('dark-mode') &&
      mainMenu.classList.contains('dark-modeMenu') &&
      optionsMenu.classList.contains('dark-modeMenu') &&
      board.classList.contains('dark-modeMenu')) {
      localStorage.setItem('darkMode', 'enabled');
      localStorage.setItem('darkModeMenu', 'enabled');
  } else {
      localStorage.setItem('darkMode', 'disabled');
      localStorage.setItem('darkModeMenu', 'disabled');
  }
});

function setInitialState() {
  const darkMode = localStorage.getItem('darkMode');
  const darkModeMenu = localStorage.getItem('darkModeMenu');

  if (darkMode === 'enabled' && darkModeMenu === 'enabled') {
      document.body.classList.add('dark-mode');
      mainMenu.classList.add('dark-modeMenu');
      optionsMenu.classList.add('dark-modeMenu');
      board.classList.add('dark-modeMenu');
  } else {
      document.body.classList.remove('dark-mode');
      mainMenu.classList.remove('dark-modeMenu');
      optionsMenu.classList.remove('dark-modeMenu');
      board.classList.remove('dark-modeMenu');
  }
}

document.addEventListener('DOMContentLoaded', setInitialState);

// timers
const READY_TIME = 3;
let timer;
let elapsedTime = null;
let readyTimer;
let readyClock = READY_TIME;

let hiscore = parseFloat(window.localStorage.getItem('hiscore')) || 0;
hiscoreEl.innerHTML = hiscore;

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
const TARGET_RADIUS_MAX = 400;
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
    hiscoreEl.innerHTML = hiscore;
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
//startBtn.click();
