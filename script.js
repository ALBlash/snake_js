//Capturing the HTML elements to which we need to add functionality.
let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".top");


let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;


// function control = listens to the button's when they're pressed;
// then creating the board and starting the game;
// and when you click play again it will start the replay function;
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay);
});


// function createBoard = hides the option to press the "Play again" 
// and creates 100 div's
//add's them to the grid
function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    }
}


function startGame() {
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares);
    //random apple
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
}


function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        alert("you hit something");
        popup.style.display = "flex";
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
}



function moveSnake(squares) {
    //remove the last part (tail) of the snake and removing its class
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");

    //  Here, the code calculates the new position for the snake's head based on its current direction
    currentSnake.unshift(currentSnake[0] + direction);
    console.log(currentSnake);
    // movement ends here
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}



function checkForHits(squares) {
    if (
        // check's if it hit the bottom;
        (currentSnake[0] + width >= width * width && direction === width) ||
        // if it hit the right
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        // hit the left
        (currentSnake[0] % width === 0 && direction === -1) ||
        // hit the top
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
    } else {
        return false;
    }
}


// if the head of the snake "[0]" contains the class "apple"
function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        // remove 'apple' add 'snake' and update the snake array
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        scoreDisplay.textContent = score;
        // speeding up the sanke
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}




function randomApple(squares) {
    do {
        // the appleIndex is going to contain a random number from 0 - 1 * squares.length
        // and what ever number comes out thats the specific div
        // that the apple isgoing to land on
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    // as long as there is no class snake in that randomly genarated div we will execute it 
    squares[appleIndex].classList.add("apple");
}




function control(e) {
    if (e.keyCode === 39) {
        direction = 1; // right
    } else if (e.keyCode === 38) {
        direction = -width; // up
    } else if (e.keyCode === 37) {
        direction = -1; // left
    } else if (e.keyCode === 40) {
        direction = +width; // down
    }
}



up.addEventListener("click", () => (direction = -width));
bottom.addEventListener("click", () => (direction = +width));
left.addEventListener("click", () => (direction = -1));
right.addEventListener("click", () => (direction = 1));



function replay() {
    grid.innerHTML = "";
    createBoard();
    startGame();
    popup.style.display = "none";
}
