// En funktion för att ladda och visa ordlistan för en kategori
function loadAndDisplayWordList(category, language) {
  // Hämta ordlistan från motsvarande JSON-fil
  fetch(`./data/${category}.json`)
    .then((response) => response.json())
    .then((data) => {
      const wordList = document.querySelector(
        `[data-dropdown="dd-${category}"] .wrapper-word`
      );
      wordList.innerHTML = ""; // Rensa innehållet i listan innan du lägger till nya ord

      // Sortera listan i bokstavsordning (A-Ö) baserat på svenska ord
      data.sort((a, b) => a.language.swedish.localeCompare(b.language.swedish));

      // Här kan du använda data för att skapa <p>-element för varje ord och översättning
      data.forEach((wordData) => {
        const wordDiv = document.createElement("div");
        wordDiv.className = "list-word";

        const swedishP = document.createElement("p");
        swedishP.className = "swedish";
        swedishP.textContent = wordData.language.swedish;
        wordDiv.appendChild(swedishP);

        const translationP = document.createElement("p");
        translationP.className = "translation";
        translationP.textContent = wordData.language[language]; // Använd rätt översättning beroende på språkval
        wordDiv.appendChild(translationP);

        wordList.appendChild(wordDiv);
      });

      // Uppdatera knapparna för språkval
      const swedishToEnglishButton = document.querySelector(
        `[data-dropdown="dd-${category}"] #swedishToEnglishButton`
      );
      const swedishToFrenchButton = document.querySelector(
        `[data-dropdown="dd-${category}"] #swedishToFrenchButton`
      );

      if (language === "english") {
        swedishToEnglishButton.classList.add("active");
        swedishToFrenchButton.classList.remove("active");
      } else {
        swedishToFrenchButton.classList.add("active");
        swedishToEnglishButton.classList.remove("active");
      }
    })
    .catch((error) =>
      console.error(
        `Det uppstod ett fel vid hämtning av data för ${category}: ${error}`
      )
    );
}

// Lyssna på klickhändelser på dropdown-knapparna
const dropdownButtons = document.querySelectorAll(".dropdown-button");

dropdownButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const containerCategories = button.closest(".container_categories");
    const categoryWords =
      containerCategories.querySelector(".dd-category_words");
    const arrow = button.querySelector(".arrow");
    const category = categoryWords.getAttribute("data-dropdown").substring(3); // Hämta kategorin från data-attributet
    categoryWords.classList.toggle("open");
    arrow.classList.toggle("rotate");

    // Ladda och visa ordlistan för den valda kategorin
    loadAndDisplayWordList(category, "english"); // Standard språk är engelska
  });
});

// Lyssna på klickhändelser på knapparna för språkbyte
const swedishToEnglishButton = document.querySelector(
  "#swedishToEnglishButton"
);
const swedishToFrenchButton = document.querySelector("#swedishToFrenchButton");

swedishToEnglishButton.addEventListener("click", () => {
  // Uppdatera ordlistan med engelska översättningar
  loadAndDisplayWordList(category, "english");
});

swedishToFrenchButton.addEventListener("click", () => {
  // Uppdatera ordlistan med franska översättningar
  loadAndDisplayWordList(category, "french");
});
