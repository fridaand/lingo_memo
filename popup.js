document.addEventListener("DOMContentLoaded", function () {
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
});
