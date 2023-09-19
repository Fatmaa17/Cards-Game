'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0'); //elements
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing;

const init = function () {
  scores = [0, 0]; // 'Holds' the scores of players 0 n 1
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
//Hidden is displayed none in the css file, so here we ADD it so it'll not b visible

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //switch to next player
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functions
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generationg a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display the dice
    diceEl.classList.remove('hidden');
    //2.1 Showing images of dices
    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled 1 : If true, Switch to next player
    if (dice !== 1) {
      //Add dice to CURRENT score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current to active's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Score > = 100?
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //2.0 Yup? Current player win

      //2.1 No? switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
