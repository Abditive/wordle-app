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
let playerString = [];
let singleString = "";
let inputFields = document.getElementsByClassName("row-1");
let winningWord = words[0];
let wordFound = false;
let testButton = document.getElementById("test-button");
// this event will trigger the game to run the checking functions
testButton.addEventListener("click", function () {
  for (let input of inputFields) {
    playerString.push(input.value);
    singleString = singleString + input.value;
  }
  for (let val of words) {
    if (val === singleString) {
      console.log("valid word");
      wordFound = true;
      if (singleString === winningWord) {
        console.log("you win");
        wordFound = false;
        for (let input of inputFields) {
          input.disabled = true;
        }
        break;
      } else {
        console.log("try again");
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
});

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

// function to focus automatically
