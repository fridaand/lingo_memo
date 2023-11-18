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
        `[data-dropdown="dd-${category}"]`
      );
      const swedishToFrenchButton = document.querySelector(
        `[data-dropdown="dd-${category}"]`
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

function loadLanguageData() {
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

    // Hämta det valda språket från localStorage
    const selectedLanguage = localStorage.getItem("language") || "english";

    // Ladda och visa ordlistan för den valda kategorin med det valda språket
    loadAndDisplayWordList(category, selectedLanguage);
  });
});

// När användaren väljer språk
document.getElementById("english").addEventListener("click", function () {
  localStorage.setItem("language", "english");
  updateLanguageDisplay("SVE-ENG", "./icons/flag/english.png");

  // Uppdatera ordlistorna med det valda språket
  const selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
    const selectedLanguage = localStorage.getItem("language") || "english";
    loadAndDisplayWordList(selectedCategory, selectedLanguage);
  }
});

document.getElementById("french").addEventListener("click", function () {
  localStorage.setItem("language", "french");
  updateLanguageDisplay("SVE-FRA", "./icons/flag/french.png");

  // Uppdatera ordlistorna med det valda språket
  const selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
    const selectedLanguage = localStorage.getItem("language") || "english";
    loadAndDisplayWordList(selectedCategory, selectedLanguage);
  }
});

// Uppdatera label och flagga när sidan laddas
window.addEventListener("load", function () {
  // Hämta det valda språket från localStorage
  const storedLanguage = localStorage.getItem("language") || "english";

  // Uppdatera label och flagga
  updateLanguageDisplay(
    storedLanguage === "english" ? "SVE-ENG" : "SVE-FRA",
    `./icons/flag/${storedLanguage}.png`
  );

  // Uppdatera ordlistorna med det valda språket
  const selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
    loadAndDisplayWordList(selectedCategory, storedLanguage);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  registerPopup();
  registerCategories();
  registerLangButton();
  loadLanguageData();
});
