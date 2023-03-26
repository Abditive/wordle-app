const words = [
  "apple",
  "amber",
  "angle",
  "angel",
  "brave",
  "bliss",
  "craft",
  "crave",
  "dwarf",
  "ditch",
  "eager",
  "elite",
  "fable",
  "feast",
  "gloom",
  "giant",
  "honor",
  "haste",
  "ideal",
  "image",
  "jolly",
  "jumpy",
  "knead",
  "knock",
  "lucid",
  "lucky",
  "merry",
  "mirth",
  "noble",
  "nerve",
  "ocean",
  "olive",
  "pilot",
  "peach",
  "quick",
  "quiet",
  "roast",
  "rally",
  "silly",
  "sugar",
  "tulip",
  "tiger",
  "urban",
  "uncle",
  "vivid",
  "venus",
  "witty",
  "wager",
  "xenon",
  "xylem",
  "yield",
  "yacht",
  "zebra",
  "zesty",
  "moose",
];
let singleString = "";
const gameContainer = document.getElementById("game-container");
let inputRowsAll = document.getElementsByClassName("test-input");
let inputRow1 = document.getElementsByClassName("row-1");
let inputRow2 = document.getElementsByClassName("row-2");
let inputRow3 = document.getElementsByClassName("row-3");
let inputRow4 = document.getElementsByClassName("row-4");
let inputRow5 = document.getElementsByClassName("row-5");
let inputRow6 = document.getElementsByClassName("row-6");
let winningWord = words[14];
let testFocus = false;
let wordFound = false;
let testButton = document.getElementById("test-button");
// this event will trigger the game to run the checking functions
let progressVar = 0;
gameContainer.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (progressVar === 0) {
      validateAnswer(inputRow1, inputRow2);
    } else if (progressVar === 1) {
      validateAnswer(inputRow2, inputRow3);
    } else if (progressVar === 2) {
      validateAnswer(inputRow3, inputRow4);
    } else if (progressVar === 3) {
      validateAnswer(inputRow4, inputRow5);
    } else if (progressVar === 4) {
      validateAnswer(inputRow5, inputRow6);
    } else if (progressVar === 5) {
      checkAnswer(inputRow6);
    }
  }
});

handleInputFocus(inputRowsAll);

function validateAnswer(currentRow, nextRow) {
  checkAnswer(currentRow);
  if (testFocus) {
    enableRow(nextRow);
    nextRow[0].focus();
  }
}
function checkAnswer(rowArray) {
  for (let input of rowArray) {
    singleString = singleString + input.value;
  }
  for (let val of words) {
    if (val === singleString) {
      testFocus = true;
      console.log("valid word");
      wordFound = true;
      if (singleString === winningWord) {
        console.log("you win");
        wordFound = false;
        //Disable played row
        disableRow(rowArray);
        break;
      } else {
        console.log("try again");
        //Disable played row
        disableRow(rowArray);
        progressVar += 1;
        console.log(progressVar);
        break;
      }
    }
  }

  if (wordFound) {
    sharedChars(singleString, winningWord);
  } else {
    console.log("this word is not on the word list");
    testFocus = false;
  }
  console.log(singleString);
  // resets the value of singleString and wordFound each time event occurs.
  wordFound = false;
  singleString = "";
}
//  sharedChars function compares two strings and returns the position shared characters
function sharedChars(currentAnswerString, correctAnswerString) {
  for (let i = 0; i < currentAnswerString.length; i++) {
    if (correctAnswerString.indexOf(currentAnswerString[i]) !== -1) {
      console.log(currentAnswerString[i]);
      if (
        correctAnswerString.indexOf(currentAnswerString[i]) ===
        currentAnswerString.indexOf(currentAnswerString[i])
      ) {
        console.log(
          `Winning Word index is ${correctAnswerString.indexOf(
            currentAnswerString[i]
          )} and INPUT index is ${currentAnswerString.indexOf(
            currentAnswerString[i]
          )} - same`
        );
      } else {
        console.log(
          `Winning Word index is ${correctAnswerString.indexOf(
            currentAnswerString[i]
          )} and INPUT index is ${currentAnswerString.indexOf(
            currentAnswerString[i]
          )} - different`
        );
      }
    }
  }
}

// handles deleting characters and autofocus on next input field if a character is inputed
function handleInputFocus(rowArray) {
  {
    for (let input of rowArray) {
      input.addEventListener("input", function (event) {
        // if one characters is entered, focus on next element
        if (input.value.length === 1) {
          input.nextElementSibling.focus();
        }
      });
      input.addEventListener("keydown", function (event) {
        //deletes input value and focuses on previous when backspace is pressed
        if (event.key === "Backspace") {
          input.value = "";
          input.previousElementSibling.focus();
        }
      });
    }
  }
}
// enables row, takes row array as input
function disableRow(rows) {
  for (let input of rows) {
    input.disabled = true;
  }
}
// disables row, takes row array as input
function enableRow(rows) {
  for (let input of rows) {
    input.disabled = false;
  }
}
