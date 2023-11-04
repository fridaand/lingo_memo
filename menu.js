let langButton = document.getElementById("choose_language"); // Button that opens the popup
let popup = document.getElementById("popUpId"); // Get the popup
let closeElements = document.querySelectorAll(".button_close"); // Get the element that closes the popup

// Array med kategorier
const categories = [
  { id: "fruits-game_1", name: "fruits_1" },
  { id: "vegetables-game_1", name: "vegetables_1" },
  { id: "animals-game_1", name: "animals_1" },
  { id: "dishes-game_1", name: "dishes_1" },
  { id: "drinks-game_1", name: "drinks_1" },
];

const maxNumberOfStartsPerCategory = 5;

// FUNCTIONS FOR THE POPUP "AVSLUTA"
langButton.onclick = function () {
  // When the user clicks the button, open the popup
  popup.style.display = "flex";
};

closeElements.forEach((e) => {
  e.onclick = function () {
    popup.style.display = "none";
  };
});

window.onclick = function (event) {
  // When the user clicks anywhere outside of the popup, close it
  if (event.target == popup) {
    popup.style.display = "none";
  }
};

// SPARA SPRÅKVAL
// Användaren väljer engelska
document.getElementById("english").addEventListener("click", function () {
  localStorage.setItem("language", "english");
  // Ev länka till nästa sida här
});

// Användaren väljer franska
document.getElementById("french").addEventListener("click", function () {
  localStorage.setItem("language", "french");
  // Ev länka till nästa sida här
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
