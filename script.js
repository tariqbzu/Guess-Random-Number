let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#submit');
const userInput = document.querySelector('#guessField');

const guessSlot = document.querySelector('#guesses');
const remaining = document.querySelector('#lastResult');

const lowHigh = document.querySelector('#lowHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert("Please Enter A Valid Number");
    } else if(guess < 0){
        alert("Please Enter A Number Higher Than 0");
    } else if(guess > 100){
        alert("Please Enter A Number Less Than 100");
    } else {
        prevGuess.push(guess);
        if(numGuess >= 10){
            displayGuess(guess);
            displayMessage(`Game Over. Random Number Was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage('Your Guess is Right');
        endGame();
    } else if(guess < randomNumber){
        displayMessage('Number is Too Low');
    } else if(guess > randomNumber){
        displayMessage('Your Guess is Too High');
    }
}

function displayGuess(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess}  `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess} `;
}

function displayMessage(message){
    lowHigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){
    userInput.value = "";
    userInput.setAttribute('disabled', '');
    
    // Update button creation
    const button = document.createElement('button');
    button.id = "newGame";
    button.textContent = "Play Again";
    button.classList.add('button');
    
    startOver.appendChild(button);
    playGame = false;
    newGame();
}

function newGame(){
    const button = document.querySelector('#newGame');
    button.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${10 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(button);  // Remove the button after starting a new game
        playGame = true;
    });
}
