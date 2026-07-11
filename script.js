const box = document.getElementById("box");
const goldBox = document.getElementById("goldBox");
const bomb = document.getElementById("bomb");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const livesEl = document.getElementById("lives");
const timerEl = document.getElementById("timer");
const message = document.getElementById("message");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const difficulty = document.getElementById("difficulty");

let score = 0;
let lives = 3;
let time = 30;
let speed = 1000;
let moveInterval;
let timerInterval;

let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.textContent = highScore;

function randomPosition(element) {
    const area = document.getElementById("gameArea");

    const x = Math.random() * (area.clientWidth - 60);
    const y = Math.random() * (area.clientHeight - 60);

    element.style.left = x + "px";
    element.style.top = y + "px";
}

function moveObjects() {

    randomPosition(box);

    if (Math.random() < 0.35) {
        goldBox.style.display = "block";
        randomPosition(goldBox);
    } else {
        goldBox.style.display = "none";
    }

    if (Math.random() < 0.30) {
        bomb.style.display = "block";
        randomPosition(bomb);
    } else {
        bomb.style.display = "none";
    }

}

box.onclick = function () {
    score++;
    scoreEl.textContent = score;
    moveObjects();
};

goldBox.onclick = function () {
    score += 5;
    scoreEl.textContent = score;
    goldBox.style.display = "none";
};

bomb.onclick = function () {
    lives--;
    livesEl.textContent = lives;
    bomb.style.display = "none";

    if (lives <= 0) {
        endGame();
    }
};

function startGame() {

    score = 0;
    lives = 3;
    time = 30;

    scoreEl.textContent = score;
    livesEl.textContent = lives;
    timerEl.textContent = time;
    message.textContent = "";

    speed = parseInt(difficulty.value);

    moveObjects();

    clearInterval(moveInterval);
    clearInterval(timerInterval);

    moveInterval = setInterval(moveObjects, speed);

    timerInterval = setInterval(() => {

        time--;
        timerEl.textContent = time;

        if (time <= 0) {
            endGame();
        }

    }, 1000);

}

function endGame() {

    clearInterval(moveInterval);
    clearInterval(timerInterval);

    box.style.display = "none";
    goldBox.style.display = "none";
    bomb.style.display = "none";

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreEl.textContent = highScore;
    }

    message.innerHTML = "🎉 Game Over! Final Score: " + score;

}

startBtn.onclick = () => {

    box.style.display = "block";
    startGame();

};

restartBtn.onclick = () => {

    location.reload();

};
