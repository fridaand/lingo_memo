// Array med kategorier
/*
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

*/

function updatePage() {
  updateRounds();
  updateTotalTime();
  updateStars();
  updateFlag();
}

/*
function registerPopup() {
  let langButton = document.querySelector("#choose_language");
  let popup = document.querySelector("#popUpId");
  let closeElements = document.querySelectorAll(".button_close");

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
}
*/

document.addEventListener("DOMContentLoaded", function () {
  updatePage();
  registerCategories();
  registerPopup();

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

//registerPopup
