function updatePage() {
  updateRounds();
  updateTotalTime();
}

document.addEventListener("DOMContentLoaded", function () {
  // Här skapar du en array med de kategorier du vill hantera
  const categories = [
    { id: "fruits-game_1", name: "fruits_1" },
    { id: "vegetables-game_1", name: "vegetables_1" },
    { id: "animals-game_1", name: "animals_1" },
    { id: "dishes-game_1", name: "dishes_1" },
    { id: "drinks-game_1", name: "drinks_1" },
  ];

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

      // Navigera till game.html med den valda kategorin
      //window.location.href = `game.html?category=vegetables_1&dataFolder=data`;
    });
  });

  const clearElement = document.getElementById("clear-button");
  clearElement.addEventListener("click", () => {
    localStorage.clear();
    updatePage();
  });
});
