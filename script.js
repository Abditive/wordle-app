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
  "loose",
  "geese",
];
let singleString = "";
const gameContainer = document.getElementById("game-container");
let gameRows = [];
let numberOfElements = 30; // sets the number of elements I want in my grid
let warning = document.getElementById("no-word");
const resetGame = document.getElementById("new-game");
const giveUpGame = document.getElementById("text-gave-up");
const textWon = document.getElementById("text-won");
const giveUpButton = document.getElementById("give-up");
const alertContainer = document.getElementById("alerts");
resetGame.addEventListener("click", newGame);
giveUpButton.addEventListener("click", giveUp);
//test
// dynamic creation of the game board
for (let i = 0; i < numberOfElements + 1; i++) {
  let row = document.createElement("input");
  gameRows.push(row);
  gameRows[i].setAttribute("id", `${i}`);
  gameRows[i].maxLength = 1;
}
let inputRow1 = createRow(gameRows, 0);
inputRow1[0].focus(); // focus on first input element on page load
console.log(inputRow1[0]);
let inputRow2 = createRow(gameRows, 1);
disableRow(inputRow2);
let inputRow3 = createRow(gameRows, 2);
disableRow(inputRow3);
let inputRow4 = createRow(gameRows, 3);
disableRow(inputRow4);
let inputRow5 = createRow(gameRows, 4);
disableRow(inputRow5);
let inputRow6 = createRow(gameRows, 5);
disableRow(inputRow6);
let inputRowsAll = document.body.getElementsByClassName("test-input"); //creation of game board ends here

let stringArray = [];
let winningWord = ["m", "o", "o", "s", "e"]; // future update to randomly generate the word everytime the game is restarted or page is refreshsed
let winningWordString = "moose"; // future update to randomly generate the word everytime the game is restarted or page is refreshsed
let testFocus = false;
let wordFound = false;
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

function createRow(elements, rowNumber) {
  let rowForGame = [];
  rowNumber = rowNumber * 5; /// this number will depend on the number of letters you want in the word
  for (let i = rowNumber; i < rowNumber + 5; i++) {
    elements[i].setAttribute("class", `test-input row-${rowNumber / 5}`);
    gameContainer.appendChild(elements[i]);
  }
  rowForGame = document.getElementsByClassName(`row-${rowNumber / 5}`);
  return rowForGame;
}
function validateAnswer(currentRow, nextRow) {
  checkAnswer(currentRow);
  if (testFocus) {
    enableRow(nextRow);
    nextRow[0].focus();
  }
}
function checkAnswer(rowArray) {
  for (let input of rowArray) {
    singleString = singleString + input.value.toLowerCase();
    stringArray.push(input.value.toLowerCase());
  }

  for (let val of words) {
    if (val === singleString) {
      testFocus = true;
      wordFound = true;
      if (singleString === winningWordString) {
        sharedCharsArray(stringArray, winningWord, rowArray);

        alertContainer.style.height = "30px";
        alertContainer.style["margin-bottom"] = "30px";
        giveUpGame.style.visibility = "visible";
        giveUpGame.textContent = `YOU WIN!`;
        giveUpGame.style.width = "fit-content";
        giveUpGame.style.height = "30px";
        for (let val of rowArray) {
          val.style["background-color"] = "#459943";
          warning.style.display = "none";
        }
        wordFound = false;
        //Disable played row
        disableRow(rowArray);
        break;
      } else {
        console.log("try again");
        //Disable played row
        disableRow(rowArray);
        progressVar += 1;
        break;
      }
    }
  }

  if (wordFound) {
    sharedCharsArray(stringArray, winningWord, rowArray);
  } else {
    alertContainer.style.height = "30px";
    alertContainer.style["margin-bottom"] = "40px";
    warning.style.transition =
      "background-color 0.5s linear, height 0.3s linear";
    warning.style.visibility = "visible";
    warning.style["background-color"] = "#3c556d";
    warning.style.height = "30px";
    warning.style.width = "fit-content";
    warning.textContent = "WORD NOT IN LIST";
    testFocus = false;
  }
  // resets the value of singleString and wordFound each time event occurs.
  wordFound = false;
  singleString = "";
  stringArray = [];
}

function sharedCharsArray(answerStringArray, winStringArray, activeRow) {
  let copyWinStringArray = [...winStringArray];
  let copyAnStringArray = [...answerStringArray];

  for (let i = 0; i < 5; i++) {
    if (copyAnStringArray[i] === copyWinStringArray[i]) {
      activeRow[i].classList.add("index-match");
      copyAnStringArray[i] = "";
      copyWinStringArray[i] = "";
    }
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (copyAnStringArray[i] === copyWinStringArray[j]) {
        if (copyAnStringArray[i] !== "") {
          activeRow[i].classList.add("letter-match");
          copyWinStringArray[j] = "";
        }
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
        if (
          event.key === "Backspace" &&
          input.previousElementSibling !== null
        ) {
          input.value = "";
          input.previousElementSibling.focus();
          warning.style.height = "0px";
          warning.style.width = "0px";
          warning.style.visibility = "hidden";
          warning.style["background-color"] = "#ee8471";
          warning.style.visibility = "hidden";
          alertContainer.style.height = "0px";
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

function newGame() {
  let resetOption = window.confirm("Are you sure you want to play a new game?");
  if (resetOption) {
    window.location.reload();
  }
}
function giveUp() {
  let giveUpOption = window.confirm(
    "Are you sure you want to know the answer?"
  );
  if (giveUpOption) {
    alertContainer.style.height = "100px";
    alertContainer.style["margin-bottom"] = "30px";
    giveUpGame.style.visibility = "visible";
    giveUpGame.textContent = `ANSWER: ${winningWordString.toUpperCase()}`;
    giveUpGame.style.width = "fit-content";
    giveUpGame.style.height = "30px";
    warning.style.visibility = "hidden";
    for (let val of gameRows) {
      val.disabled = true;
    }
  }
}
// let output = document.getElementsByClassName("test-input");
// let keys = document.getElementsByClassName("key");
// for (let val of keys) {
//   val.textContent = val.textContent;
// }

// for (let keyElement of keys) {
//   let key = keyElement.textContent;
//   keyElement.addEventListener("click", function () {
//     switch (key) {
//       case "␡":
//         output.textContent = output.textContent.slice(
//           0,
//           output.textContent.length - 1
//         );
//         break;
//       case "␡ all":
//         output.textContent = "";
//         break;
//       default:
//         document.hasFocus.value = "a";
//     }
//   });
// }
