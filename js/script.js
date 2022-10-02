// game constents & variables.
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let board = document.getElementById("game-board");
let speed = 5;
let lastPaintTime = 0;
let snakeArray = [
    { x: 13, y: 15 }
];
let food = { x: 6, y: 7 };
let score = 0;


// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isColide(sarr) {
    //If you bump into yourself.
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }

    //If you bump into the wall.
    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //part 1: Updating the snake array and food.
    if (isColide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        scoreBox.innerHTML = "Score:" + 0;
        alert("Game Over. Press any key to play again!");
        inputDir = { x: 0, y: 0 };
        snakeArray = [{ x: 13, y: 15 }];
        // musicSound.play();
        score = 0;
    }

    //if you have eaten the food, increament the score and regenerate the food.
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscore) {
            hiscore = score;
            localStorage.setItem('highscore', JSON.stringify(hiscore));
            highscoreBox.innerHTML = "High Score: " + hiscore;
        }
        scoreBox.innerHTML = "Score:" + score;
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // // Moving the snake.
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = {...snakeArray[i] };
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    //part 2: Display the snake and food.
    //Display the snake Element.
    board.innerHTML = '';
    snakeArray.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display the food Element.
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




//main logic start frome here.
let hiscore = localStorage.getItem('highscore');
if (hiscore == null) {
    hiscoreval = 0;
    localStorage.setItem('highscore', JSON.stringify(hiscoreval));
} else {
    hiscore = JSON.parse(hiscore);
    highscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log(e.key);
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowLeft":
            console.log(e.key);
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log(e.key);
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowDown":
            console.log(e.key);
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        default:
            break;
    }
});