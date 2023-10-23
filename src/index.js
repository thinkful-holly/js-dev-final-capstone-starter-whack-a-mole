const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
 
const score = document.querySelector('#score'); 
const timerDisplay = document.querySelector('#timer');


let time = 0;
let timer = 0;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

 
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * (2) Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return Math.floor(Math.random() * (1200 - 600 + 1)) + 600;
  } else {
    // Handle invalid difficulty values
    return "Invalid difficulty";
  }
}

/**
 * (3) Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */


function chooseHole(holes) {
  const index = randomInteger(0, 8);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

let hole = chooseHole(holes);

// highlight random hole
hole.classList.toggle("highlight");
console.log(hole.innerHTML);
console.log(hole.classList);

// choose another hole and highlight it too
hole = chooseHole(holes);
hole.classList.toggle("highlight");
console.log(hole.innerHTML);
console.log(hole.classList);

/**
* (3)
* Calls the showUp function if time > 0 and stops the game if time = 0.
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
   reivew the below */



function gameOver() {
  if(time > 0){
    const timeoutId = showUp();
    return timeoutId;
  } else {
    let gameStopped = stopGame();
    return gameStopped;
  }
}

/**
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*/
function showUp() {
  let delay = setDelay(difficulty);
  const holes = document.querySelectorAll('.hole'); // gets the list of all the holes
  const hole = chooseHole(holes); // use to select a random 
  return showAndHide(hole, delay);
}


/**
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*/
function showAndHide(hole, delay){
// TODO: call the toggleVisibility function so that it removes the 'show' class when the timer times out.
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
   toggleVisibility(hole, false);
    gameOver();
  }, delay); 
  return timeoutID;
}

function toggleVisibility(hole, show) {
  if (show) {
    hole.classList.add('show');
  } else {
    hole.classList.remove('show');
  }
}


/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole){
 hole.classList.toggle('show');  
  return hole;
}

/**
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*/



/**
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*/

function updateScore() {
  points++;
  const score = document.getElementById('score');
  score.textContent = points;
  return points;
}

function clearScore() {
   points = 0;
   score.textContent = points;
  return points;
}


function updateTimer() {
  if (time > 0) {
    time--; // Decrement the time by 1 second
    // Update the timer display
    const timerDisplay = document.querySelector("#timer");
    timerDisplay.innerHTML = time;
  }
  return time;
}

/**
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*/

function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}
startTimer();
/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
 
 

function whack(event) {
  updateScore();
  return points;
}

function setEventListeners() {
  // Loop through each mole and add a 'click' event listener to it
  for (let i = 0; i < moles.length; i++) {
    moles[i].addEventListener('click', whack);
  }
  return moles;
}



function setEventListeners(){
  moles.forEach(
    mole => mole.addEventListener('click', whack)
  );
  return moles;
}

setEventListeners();


/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration; //  
  return time; //  
}

// review this
const newDuration = setDuration(60);

console.log("New game duration: " + newDuration + " seconds");

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/

function clearScore() {
   points = 0;
   score.textContent = points;
   return points;
}



function stopGame(){
  // stopAudio(song);  //optional
  clearInterval(timer);
  return "game stopped";
}

/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame() {
   setDuration(15);
   clearScore();
   setEventListeners();
   startTimer();
   showUp();
   
  return "game started";
}

// Add an event listener to the startButton
startButton.addEventListener('click', startGame);

// audio
function playAudio(audioObject) {
  audioObject.play();
}

function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}

function stopAudio(audioObject) {
  audioObject.pause();
}

function play(){
  playAudio(song);
}


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
