// Array med kategorier
const categories = [
  { id: "fruits-game_1", name: "fruits_1" },
  { id: "vegetables-game_1", name: "vegetables_1" },
  { id: "animals-game_1", name: "animals_1" },
  { id: "dishes-game_1", name: "dishes_1" },
  { id: "drinks-game_1", name: "drinks_1" },
  { id: "colours-game_1", name: "colours_1" },
  { id: "fruits-game_2", name: "fruits_2" },
];

const maxNumberOfStartsPerCategory = 5;

// LOAD THE GAME CARDS & CATEGORY TITLE AT GAME.HTML
categories.forEach((category) => {
  const categoryElement = document.getElementById(category.id);

  if (categoryElement) {
    categoryElement.addEventListener("click", function () {
      localStorage.setItem("selectedCategory", category.name);
      localStorage.setItem(
        "categoryTitle",
        document.getElementById("cate-" + category.name).innerText
      );
    });
  }
});

// CHOOSE LANGUAGE
// User choose English
document.getElementById("english").addEventListener("click", function () {
  localStorage.setItem("language", "english");
  updateLanguageDisplay("SVE-ENG", "./icons/flag/english.png");
});

// User choose French
document.getElementById("french").addEventListener("click", function () {
  localStorage.setItem("language", "french");
  updateLanguageDisplay("SVE-FRA", "./icons/flag/french.png");
});
// Function for updating label and flag, based on the saved language
function updateLanguageDisplay(defaultText, flagImage) {
  const language = localStorage.getItem("language") || "english";
  document.getElementById("selected_language").textContent = defaultText;

  const flagElement = document.getElementById("flag");
  if (language === "english") {
    flagElement.src = "./icons/flag/english.png";
  } else if (language === "french") {
    flagElement.src = "./icons/flag/french.png";
  }
}

// Update label and flag when page reloads
window.addEventListener("load", function () {
  // Save language choice when page loads
  const storedLanguage = localStorage.getItem("language") || "english";

  const flagElement = this.document.getElementById("flag");
  if (storedLanguage === "english") {
    flagElement.src = "./icons/flag/english.png";
    updateLanguageDisplay("SVE-ENG", "./icons/flag/english.png");
  } else if (storedLanguage === "french") {
    flagElement.src = "./icons/flag/french.png";
    updateLanguageDisplay("SVE-FRA", "./icons/flag/french.png");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  updatePage(); // Uppdatera sidan när den laddas
});

function updatePage() {
  updateRounds();
  updateTotalTime();
  updateStars();
}

function updateStars() {
  categories.forEach((category) => {
    const starsElement = document.getElementById("stars-" + category.name);
    let numberOfStars = localStorage.getItem("stars-" + category.name) || 0;
    numberOfStars = Math.min(numberOfStars, maxNumberOfStartsPerCategory);
    starsElement.innerHTML = "";
    for (let i = 0; i < numberOfStars; i++) {
      starsElement.innerHTML += `<img class="star" src="./icons/star_full.png" alt="Star for points"/>`;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updatePage();

  // Loopa igenom varje kategori och lägg till klickhändelselyssnare
  categories.forEach((category) => {
    const missionElement = document.getElementById(category.id);

    missionElement.addEventListener("click", () => {
      // Spara den valda kategorin i localStorage
      localStorage.setItem("selectedCategory", category.name);
      localStorage.setItem(
        "categoryTitle",
        document.getElementById("cate-" + category.name).innerText
      );
    });
  });
});

// KOD FRÅN MENU.JS SLUT

function updateRounds() {
  let rounds = localStorage.getItem("totalRounds") || 0;
  document.getElementById("info-rounds").innerText = rounds;
}

function updateTime(time, id) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.getElementById(id).innerText = minutes + ":" + seconds;
}

function updateTotalTime() {
  let totalTime = localStorage.getItem("totalTime");
  updateTime(totalTime, "info-totaltime");
}
