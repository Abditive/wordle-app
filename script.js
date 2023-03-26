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
let winningWord = words[0];
let wordFound = false;
let testButton = document.getElementById("test-button");
// this event will trigger the game to run the checking functions
let progressVar = 0;
gameContainer.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (progressVar === 0) {
      checkAnswer(inputRow1);
      enableRow(inputRow2);
      inputRow2[0].focus();
    } else if (progressVar === 1) {
      checkAnswer(inputRow2);
      enableRow(inputRow3);
      inputRow3[0].focus();
    } else if (progressVar === 2) {
      checkAnswer(inputRow3);
    } else if (progressVar === 3) {
      checkAnswer(inputRow4);
    } else if (progressVar === 4) {
      checkAnswer(inputRow5);
    } else if (progressVar === 5) {
      checkAnswer(inputRow6);
    }
  }
});
``;
handleInputFocus(inputRowsAll);
// Function Definition
function checkAnswer(rowArray) {
  for (let input of rowArray) {
    singleString = singleString + input.value;
  }
  for (let val of words) {
    if (val === singleString) {
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
  }
  console.log(singleString);
  // resets the value of singleString and wordFound each time click event occurs.
  wordFound = false;
  singleString = "";
}

//  sharedChars function compares two strings and returns the position shared characters
function sharedChars(str1, str2) {
  for (let i = 0; i < str1.length; i++) {
    if (str2.indexOf(str1[i]) !== -1) {
      console.log(str1[i]);
      if (str2.indexOf(str1[i]) === str1.indexOf(str1[i])) {
        console.log(
          `Winning Word index is ${str2.indexOf(
            str1[i]
          )} and INPUT index is ${str1.indexOf(str1[i])} - same`
        );
      } else {
        console.log(
          `Winning Word index is ${str2.indexOf(
            str1[i]
          )} and INPUT index is ${str1.indexOf(str1[i])} - different`
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
        if (input.value.length === 1) {
          input.nextElementSibling.focus();
        }
      });
      input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          console.log("back");
          input.previousElementSibling.textContent = "";
          input.previousElementSibling.focus();
        }
      });
    }
  }
}
function disableRow(rows) {
  for (let input of rows) {
    input.disabled = true;
  }
}
function enableRow(rows) {
  for (let input of rows) {
    input.disabled = false;
  }
}
