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
  { id: "colours-game_1", name: "colours_1" },
  { id: "fruits-game_2", name: "fruits_2" },
];

const maxNumberOfStartsPerCategory = 5;

// FUNCTIONS FOR THE POPUP "AVSLUTA"
langButton.onclick = function () {
  // When the user clicks the button, open the popup
  popup.style.display = "flex";
  popup.style.animationPlayState = "running"; // Starta animationen
  //popup.classList.add("fade");
};

closeElements.forEach((e) => {
  e.onclick = function () {
    popup.style.display = "none";
    // popup.classList.remove("fade");
  };
});

window.onclick = function (event) {
  // When the user clicks anywhere outside of the popup, close it
  if (event.target == popup) {
    popup.style.display = "none";
    // popup.classList.remove("fade");
  }
};

// SPARA SPRÅKVAL, & PREPARED CODE FOR PUTTING IN FLAG IMAGES
// Användaren väljer engelska
document.getElementById("english").addEventListener("click", function () {
  localStorage.setItem("language", "english");
  updateLanguageDisplay("SVE-ENG", "flag_english.png"); // Uppdatera text och flagga});
});
// Användaren väljer franska
document.getElementById("french").addEventListener("click", function () {
  localStorage.setItem("language", "french");
  updateLanguageDisplay("SVE-FRA", "flag_french.png"); // Uppdatera text och flagga  // Ev länka till nästa sida här
  // Ev länka till nästa sida här
});

// Funktion för att uppdatera texten och flaggan baserat på det sparade språket
function updateLanguageDisplay(defaultText, flagImage) {
  const language = localStorage.getItem("language") || "english"; // Använd engelska som standard om inget är sparad
  if (language === "english") {
    document.getElementById("selected_language").textContent = defaultText;
    document.getElementById("flag").src = flagImage;
  } else if (language === "french") {
    document.getElementById("selected_language").textContent = defaultText;
    document.getElementById("flag").src = flagImage;
  } // Lägg till fler `else if`-block för andra språk om det behövs
}

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

//PREPARED CODE FOR PUTTING IN FLAG IMAGES
// Uppdatera text och flagga när sidan laddas
window.addEventListener("load", function () {
  // SPARA SPRÅKVAL när sidan laddas
  const storedLanguage = localStorage.getItem("language");
  if (storedLanguage) {
    const flagImage = "flag_" + storedLanguage + ".png";
    const displayedLanguage =
      storedLanguage === "english" ? "SVE-ENG" : "SVE-FRA";
    currentLanguage = storedLanguage; // Uppdatera aktuellt språk
    updateLanguageDisplay(displayedLanguage, flagImage);
    currentLanguage = storedLanguage; // Uppdatera aktuellt språk
  } else {
    // Om inget språk har sparats, använd standardtext och flagga
    updateLanguageDisplay("SVE-ENG", "flag_english.png");
  }
});

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
