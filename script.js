const gameArea = document.querySelector(".game-area");
const basket = document.querySelector(".basket");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const gameOverMessage = document.getElementById("gameOverMessage");
const restartButton = document.getElementById("restartButton");
const scoreDisplay = document.getElementById('scoreDisplay');

//initial position
let basketPosition = gameArea.offsetWidth / 2 - basket.offsetWidth / 2;
let moveSpeed = 15; //speed of movement
let fallingSpeed = 5; // speed of falling objects
let fallingObjects = []; // array to keep track number of falling objects;
let score = 0; // initialize score
let gameInterval; // To hold the interval for falling object
let movingInterval; // To hold the interval for moving object
let gameOver = false; // To track the game over message

// start the game
function startGame() {
    if(gameOver) return ;
  gameInterval = setInterval(() => {
    createFallingObject();
  }, 1000);

  movingInterval = setInterval(moveFallingObjects, 100);
}

// Stop the game
function stopGame() {
  clearInterval(gameInterval);
  clearInterval(movingInterval);

  fallingObjects.forEach((object) => {
    gameArea.removeChild(object);
  });
  fallingObjects = [];
}

// restart game function

function restartGame(){
      gameOver = false;
      gameOverMessage.style.display = 'none';
      score=0;
      updateScoreDispaly();
      startGame();
}

startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
restartButton.addEventListener('click', restartGame);

function increaseDifficulty() {
    if(score % 5 ===0 && score>0){
        fallingSpeed += 1;

    }
}

// Function to move the basket left and right
function moveBasket(event) {
  if (event.key === "ArrowLeft") {
    //move left
    if (basketPosition > 45) {
      basketPosition -= moveSpeed;
    }
  } else if (event.key === "ArrowRight") {
    //move Right
    if (basketPosition < gameArea.offsetWidth - 60) {
      basketPosition += moveSpeed;
    }
  }

  //update basket position on the screen
  basket.style.left = basketPosition + "px";
}

// function to create falling objects
function createFallingObject() {
  if (!gameOver) {
    const fallingObject = document.createElement("div");
    fallingObject.classList.add("falling-object");

    //set a random position at the top
    const randomX = Math.random() * (gameArea.offsetWidth - 30); // assuming falling object has width 30px
    fallingObject.style.left = randomX + "px";
    fallingObject.style.top = "0px"; //start at the top

    gameArea.appendChild(fallingObject);
    fallingObjects.push(fallingObject);
  }
}

// function to move falling objects;
function moveFallingObjects() {
  fallingObjects.forEach((object, index) => {
    //get the current top speed
    const currentTop = parseFloat(object.style.top);
    const newTop = currentTop + fallingSpeed;

    object.style.top = newTop + "px";

    // check for colliding
    if (isColliding(basket, object)) {
      //remove the object and update score
      gameArea.removeChild(object);
      fallingObjects.splice(index, 1);
      score++;
      updateScoreDisplay();
      increaseDifficulty();
    }

    //remove object if it reaches the bottom of the game
    if (newTop > gameArea.offsetHeight) {
      stopGame();
      gameOverMessage.style.display = "block";
      gameOver = true;
    }
  });
}

function isColliding(basket, object) {
  const basketRect = basket.getBoundingClientRect();
  const objectRect = object.getBoundingClientRect();

  return !(
    basketRect.right < objectRect.left ||
    basketRect.left > objectRect.right ||
    basketRect.bottom < objectRect.top ||
    basketRect.top > objectRect.bottom
  );
}


function updateScoreDisplay(){
    scoreDisplay.innerText = `Score: ${score}`;
}

setInterval(() => {
  createFallingObject();
}, 1000);

setInterval(moveFallingObjects, 100);

document.addEventListener("keydown", moveBasket);
