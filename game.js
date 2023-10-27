const gridContainer = document.querySelector(".grid-container");
/*const timerElement = document.querySelector(".timer span");
const roundsElement = document.querySelector("#rounds span");
const totalMinutesElement = document.querySelector("#total-minutes span");
*/
const timerSpans = document.querySelectorAll(".timer");
//const roundsSpans = document.querySelectorAll(".rounds");
//const totalMinutesSpan = document.querySelector(".total-minutes");

// Händelselyssnare för mute-knappen
const muteButton = document.getElementById("mute-button");

let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let timer = 0;
let timerInterval;
//let totalRounds = parseInt(localStorage.getItem("totalRounds")) || 0;
let totalMinutes = parseInt(localStorage.getItem("totalMinutes")) || 0;
let isMuted = false; // Variabel för att hålla reda på ljudtillståndet

function updateScore() {
    document.querySelectorAll(".score").forEach((span) => {span.textContent = score;});
}

/*
document.querySelector(".score").textContent = score;
roundsElement.textContent = totalRounds;
totalMinutesElement.textContent = totalMinutes;
*/
//roundsSpan.textContent = totalRounds;
//totalMinutesSpan.textContent = totalMinutes;

let category = localStorage.getItem("selectedCategory");

fetch("./data/" + category + ".json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

document.getElementById("cate").innerText = localStorage.getItem("categoryTitle");

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
    <div class="front">
        <img class="front-image" src=${card.image} />
        <p class="card-text">${card.language.english}</p>
    </div>
    <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", function () {
      if (!isMuted) {
        playCardSound(card.audio); // Spela upp ljudet när kortet klickas på
      }

      flipCard.call(this);
    });
  }
}

function playCardSound(audioSrc) {
  const audio = new Audio(audioSrc);
  audio.play();
}

muteButton.addEventListener("click", () => {
  isMuted = !isMuted; // Växla ljudets tillstånd

  // Uppdatera knappens ikon beroende på ljudtillståndet
  muteButton.innerHTML = isMuted ? "🔊" : "🔇";

  // Om ljudet är avstängt, stäng av alla ljud
  if (isMuted) {
    document.querySelectorAll(".card").forEach((card) => {
      const audioElement = card.querySelector("audio");
      audioElement.pause();
    });
  }
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    startTimer();
    return;
  }

  secondCard = this;
  score++;
  updateScore();
  lockBoard = true;

  checkForMatch();
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
        timer++;
        timerSpans.forEach((span) => {
            span.textContent = timer;
        })
    }, 1000);
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  if (document.querySelectorAll(".card:not(.flipped)").length === 0) {
    endGame();
  }
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

document.addEventListener("DOMContentLoaded", function () {
  // Dölj .container_end-game vid sidans laddning
  document.querySelector(".section_end-game").style.display = "none";
  document.querySelector(".container_game-info").style.display = "flex";

  let currentRounds = localStorage.getItem("totalRounds") || 0;
  document.getElementById("info-rounds").innerText = currentRounds;

  updateScore();
});

function endGame() {
  //totalRounds++;
  totalMinutes += timer / 60;

  // Rounds
  let nRounds = localStorage.getItem("totalRounds") || 0;
  localStorage.setItem("totalRounds", ++nRounds);
  document.getElementById("info-rounds").innerText = nRounds;

  localStorage.setItem("totalMinutes", totalMinutes);

    // Increase number of rounds
    //let nRounds = localStorage.getItem("prevTotalRounds") || 0;
    //localStorage.setItem("prevTotalRounds", ++nRounds);
    //document.getElementById("info-rounds").innerText = nRounds;
    /*
  roundsElement.textContent = totalRounds;
  totalMinutesElement.textContent = Math.floor(totalMinutes);
*/

  //totalMinutesSpan.textContent = Math.floor(totalMinutes);

  clearInterval(timerInterval);
  timerInterval = null;
  timer = 0;

  // När spelet är slut
  document.querySelector(".section_end-game").style.display = "flex";
  document.querySelector(".container_game-info").style.display = "none";
}

function restartGame() {
  // När spelet startas om
  document.querySelector(".section_end-game").style.display = "none";
  document.querySelector(".container_game-info").style.display = "flex";
  resetBoard();
  shuffleCards();
  score = 0;
  updateScore();
  gridContainer.innerHTML = "";
  generateCards();
}
