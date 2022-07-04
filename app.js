/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getWiningNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener("click", function (e) {
  let guess = parseInt(guessInput.value);
  console.log(winningNum)

  if (e.target.value === "Play Again" && guessesLeft === 0) {
    window.location.reload();
  }

  if (guess === winningNum) {
    setTimeout(() => {
      window.location.reload();
      
    }, 4000);
  }

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    //Game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    //Wrong number
    guessesLeft -= 1;

    // guessesLeft = guessesLeft -1

    if (guessesLeft === 0) {
      //Game over - lost
      // Disable input
      guessInput.disabled = true;
      // Change border color
      guessInput.style.borderColor = "red";
      // Set message
      setMessage(
        `Game Over, you lost .The correct number was ${winningNum}`,
        "red"
      );
    } else {
      // Disable input
      guessInput.disabled = false;
      // Game continues - answer wrong
      gameOver(
        false,
        ` Game Over, you lost. The correct number was ${winningNum}`
      );

      //change border color
      guessInput.style.borderColor = "red";

      //clear
      guessInput.value = "";

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // Disable input
  // guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set Text Color
  message.style.color = color;

  // Set message
  setMessage(msg);

  guessBtn.value = "Play Again";
  guessBtn.className += "play again";
}

//Get Winning Number
function getWiningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
