const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timeLeftBoard = document.querySelector('.time');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('#start');
const gameoverScreen = document.querySelector('#gameover');
const finalScore = document.querySelector('#finalScore');

let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 30;
let timerInterval;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(300, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeLeftBoard.textContent = 30;
    timeUp = false;
    score = 0;
    timeLeft = 30;
    gameoverScreen.classList.add('hidden');
    button.style.visibility = 'hidden';
    peep();
    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftBoard.textContent = timeLeft;
        if (timeLeft === 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    timeUp = true;
    finalScore.textContent = score;
    gameoverScreen.classList.remove('hidden');
    button.innerHTML = 'Restart?';
    button.style.visibility = 'visible';

    const gameOverSound = new Audio('gameover.aiff');
    gameOverSound.play();
}

function restartGame() {
    gameoverScreen.classList.add('hidden');
    startGame();
}

function bonk(e) {
    if (!e.isTrusted) return; // Cheater!
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;

    const whackSound = new Audio('whacksound.mp3');
    whackSound.play();
}

moles.forEach(mole => mole.addEventListener('click', bonk));
