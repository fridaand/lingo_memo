/* FUNKAR VER 1 
const dropdownButton = document.getElementById("dropdown-button");
//const dropdownButton = document.querySelectorAll(".dropdown-button");
const arrow = document.querySelector(".arrow");
const dropdownList = document.querySelector(".dd-category_words");

dropdownButton.addEventListener("click", function () {
  dropdownList.classList.toggle("open");
  arrow.classList.toggle("rotate");
});
*/

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

/* PÅBÖRJAD TEST DATALISTA I DD
function generateDropdownContent(dataList) {
  const dropdownContent = document.getElementById("category-dropdown");

  // Loopa genom data-listan och generera kategorier och ord
  for (let category of dataList) {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");
    categoryDiv.innerHTML = `
        <h3>${category.categoryName}</h3>
      `;

    for (let word of category.words) {
      const wordDiv = document.createElement("div");
      wordDiv.classList.add("word");
      wordDiv.innerHTML = `
          <p class="word_language">${word.language}</p>
          <p class="word_swedish">${word.swedish}</p>
        `;
      categoryDiv.appendChild(wordDiv);
    }

    dropdownContent.appendChild(categoryDiv);
  }
}

window.addEventListener("load", function () {
  // Här laddar du din data-lista och kategoriserar den (du kan använda en funktion för detta)
  const dataList = loadAndCategorizeData(); // Funktionen du skapar för att ladda och kategorisera data

  // Anropa funktionen för att generera dropdown-innehåll
  generateDropdownContent(dataList);
});
*/
