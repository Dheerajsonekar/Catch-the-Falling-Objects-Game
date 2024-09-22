const gameArea = document.querySelector('.game-area');
const basket = document.querySelector('.basket');

//initial position 
let basketPosition = gameArea.offsetWidth / 2 - basket.offsetWidth / 2;
let moveSpeed  = 15; //speed of movement
let fallingSpeed = 5; // speed of falling objects
let fallingObjects = [] // array to keep track number of falling objects;
let score = 0; // initialize score


// Function to move the basket left and right
function moveBasket(event){

    
 
    if(event.key ==='ArrowLeft'){
        //move left
        if(basketPosition > 45){
          basketPosition -= moveSpeed;
        }
    }
    else if(event.key==='ArrowRight'){
        //move Right
        if(basketPosition < gameArea.offsetWidth -60  ){
            basketPosition += moveSpeed;
        }
    }

    //update basket position on the screen 
    basket.style.left = basketPosition + 'px';

    
    
}

// function to create falling objects
function createFallingObject(){
 const fallingObject = document.createElement('div');
 fallingObject.classList.add('falling-object');

 //set a random position at the top
 const randomX = Math.random() * (gameArea.offsetWidth - 30); // assuming falling object has width 30px
 fallingObject.style.left = randomX + 'px';
 fallingObject.style.top = '0px'; //start at the top

 gameArea.appendChild(fallingObject);
 fallingObjects.push(fallingObject);

}

// function to move falling objects;
function moveFallingObjects(){
    fallingObjects.forEach((object, index)=> {
        //get the current top speed
        const currentTop = parseFloat(object.style.top);
        const newTop = currentTop + fallingSpeed;

        object.style.top = newTop + 'px';


        // check for colliding 
        if(isColliding(basket, object)){
            //remove the object and update score
            gameArea.removeChild(object);
            fallingObjects.splice(index, 1);
            score++;
            console.log('Score: ', score);
        }

        //remove object if it reaches the bottom of the game
        if(newTop > gameArea.offsetHeight){

            gameArea.removeChild(object);
            fallingObjects.splice(index, 1);
        }
    });
}

function isColliding(basket, object){
    const basketRect = basket.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();

    return !(
        basketRect.right < objectRect.left ||
        basketRect.left > objectRect.right ||
        basketRect.bottom < objectRect.top ||
        basketRect.top > objectRect.bottom
    );
}








setInterval(()=>{
    createFallingObject();
}, 1000);

setInterval(moveFallingObjects, 100)



document.addEventListener('keydown', moveBasket);

