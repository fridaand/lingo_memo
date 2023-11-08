// Hämta alla element med klassen "dropdown-button"
const dropdownButtons = document.querySelectorAll(".dropdown-button");

// Loopa igenom alla knappar
dropdownButtons.forEach((button) => {
  // Lägg till klickhändelse på varje knapp
  button.addEventListener("click", function () {
    // Hitta närmaste "container_categories" för den klickade knappen
    const containerCategories = button.closest(".container_categories");

    // Hitta "dd-category_words" inom samma "container_categories"
    const categoryWords =
      containerCategories.querySelector(".dd-category_words");

    const arrow = button.querySelector(".arrow");

    // Byt ut klassen för "dd-category_words" för att öppna/stänga dropdown
    categoryWords.classList.toggle("open");
    arrow.classList.toggle("rotate");
  });
});
