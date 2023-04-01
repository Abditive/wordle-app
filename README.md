# wordle-app

# WARDLE - Wordle Clone

This is a simple Wordle clone game built with HTML, CSS, and JavaScript.

## Getting Started

To play the game, simply open the `index.html` file in your browser. You can also play the game online by visiting the [GitHub Pages site](https://yourusername.github.io/wordle-clone/) for this project.

## How to Play

The goal of the game is to guess the secret five-letter word within six attempts. To make a guess, type a five-letter word into the input field and press the "Guess" button. The game will then display a row of colored circles to indicate how many letters are correct and in the right position (red circle) and how many letters are correct but in the wrong position (yellow circle).

## Features

- Feedback on each guess.
  - Yellow represents a letter that is present in the word but at a different location.
  - Green represents a letter that is present in the word and at the same location.
- Responsive design

## FUTURE Features

- Randomly generated secret five-letter word
- On-screen keyboard (currently commented out)
- Timer to make the game more challenging (coming soon)
- Spanish language support (coming soon)
- Implementation of separate file with full word list

This is a JavaScript code that creates a word game where the player has to guess a five-letter word from a list of given words. The game is played on a grid with six rows, each consisting of five input fields where the player can input one letter at a time. The player has to guess the letters of the word in the correct order, and for each row, the player is given feedback on how many letters they have guessed correctly.

The game starts by dynamically creating the game board, which consists of six rows of five input fields each. The first row is enabled, and the player can enter a letter in each field. When the player presses Enter, the program checks if the letters in the input fields match any of the words in the given list of words. If the player has guessed the correct letters, the program enables the next row, and the player can continue to the next row. If the player has guessed all the letters correctly, the program declares the player the winner.

The program includes functions for validating the player's input, checking if the input matches any of the words in the list, and enabling/disabling rows on the game board. The program also includes variables for the winning word, the number of elements in the game grid, and several HTML elements that are used to display feedback to the player.

## Technologies Used

- HTML
- CSS
- JavaScript

## Acknowledgments

This project was inspired by the popular game Wordle originally created by Josh Wardle .

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
