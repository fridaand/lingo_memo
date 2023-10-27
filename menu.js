document.addEventListener("DOMContentLoaded", function () {
  // Här skapar du en array med de kategorier du vill hantera
  const categories = [
    { id: "fruits-game_1", name: "fruits_1" },
    { id: "vegetables-game_1", name: "vegetables_1" },
    { id: "animals-game_1", name: "animals_1" },
    { id: "dishes-game_1", name: "dishes_1" },
  ];

  const missionList = document.getElementById("mission-list");

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

      // Navigera till game.html med den valda kategorin
      window.location.href = `game.html?category=vegetables_1&dataFolder=data`;
    });
  });
});

// FÖRSÖK: Spara spelresultat
const totalRoundsElement = document.querySelector(".rounds");
const totalMinutesElement = document.querySelector(".total-minutes");

const totalRounds = localStorage.getItem("totalRounds") || 0;
const totalMinutes = localStorage.getItem("totalMinutes") || 0;

totalRoundsElement.textContent = `Antal spelade omgångar: ${totalRounds}`;
totalMinutesElement.textContent = `Totalt spelade minuter: ${totalMinutes}`;

/* 
ATT FIXA: 
-spelresultat på båda sidor 
-antal spelade minuter
-ev lägga till funktion för att läsa upp kategorikort på huvudsida också
-game: pop-up resultat span kunna visa på två ställen
*/
