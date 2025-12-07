const GAME_STATES = {
  UNSTARTED: 'unstarted',
  PLAYING: 'playing',
  FINISHED: 'finished',
}

const MIN_NUMBER = 1;
const MAX_NUMBER = 1000;

let low = MIN_NUMBER;
let high = MAX_NUMBER;
let guess = Math.floor((low + high) / 2);
let isStarted = GAME_STATES.UNSTARTED;

const correctButton = document.getElementById('correct-button');
const higherButton = document.getElementById('higher-button');
const lowerButton = document.getElementById('lower-button');

const messageHeader = document.getElementById('message-header');
const messageParagraph = document.getElementById('message-paragraph');

const handleUnstarted = () => {
  low = 1;
  high = 1000;
  guess = Math.floor((low + high) / 2);
  correctButton.textContent = 'Start';
  correctButton.ariaLabel = 'Start Game';
  higherButton.hidden = true;
  lowerButton.hidden = true;
  messageHeader.textContent = "Let's Play!"
  messageParagraph.textContent = `Think of a number between ${MIN_NUMBER} and ${MAX_NUMBER}, and I will try to guess it.`;
}

const handleCorrect = () => {
  correctButton.textContent = 'Play Again';
  correctButton.ariaLabel = 'Play Again';
  higherButton.hidden = true;
  lowerButton.hidden = true;
  messageHeader.textContent = 'Yay! I guessed your number!';
  messageParagraph.textContent = `Your number is ${guess}.`;
}

const handlePlay = () => {
  messageHeader.textContent = 'Is your number';
  correctButton.textContent = 'Correct';
  correctButton.ariaLabel = 'Correct Guess';
  higherButton.hidden = false;
  lowerButton.hidden = false;
}

const handleGuess = () => {
  guess = Math.floor((low + high) / 2);
  messageParagraph.textContent = guess.toString();
}

correctButton.addEventListener('click', () => {
  if (isStarted === GAME_STATES.UNSTARTED) {
    isStarted = GAME_STATES.PLAYING;
    handlePlay();
    handleGuess();
  } else if (isStarted === GAME_STATES.PLAYING) {
    isStarted = GAME_STATES.FINISHED;
    handleCorrect();
  } else if (isStarted === GAME_STATES.FINISHED) {
    isStarted = GAME_STATES.UNSTARTED;
    handleUnstarted();
  }
});

higherButton.addEventListener('click', () => {
  low = guess + 1;
  handleGuess();
});

lowerButton.addEventListener('click', () => {
  high = guess - 1;
  handleGuess();
});

handleUnstarted();

