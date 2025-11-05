document.addEventListener("DOMContentLoaded", function () {
  const decreaseBtn = document.getElementById("decreaseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const increaseBtn = document.getElementById("increaseBtn");
  const counterLabel = document.getElementById("counterLabel");
  const counterText = document.getElementById("countingText");
  const successSound = document.getElementById("successMusic");
  const clickSound = new Audio("button-click(chosic.com).mp3")


  let counter = 0;

  function updateCounterDisplay() {
    counterLabel.textContent = counter;
    clickSound.play();

    if (counter === 33 || counter === 100) {
      counterText.textContent = "Masha Allah! You are doing great — Ahsanta!";
      successSound.currentTime = 0; // restart sound
      successSound.play();
    } else {
      counterText.textContent = "Keep going with dhikr 💫";
    }
  }

  increaseBtn.onclick = function () {
    counter++;
    updateCounterDisplay();
    clickSound.play();
  };

  decreaseBtn.onclick = function () {
    counter--;
    updateCounterDisplay();
    clickSound.play();
  };

  resetBtn.onclick = function () {
    counter = 0;
    updateCounterDisplay();
    clickSound.play();
  };
});
// ======== Adhkar Checklist Save Feature ======== //
const checkboxes = document.querySelectorAll("#adhkar input[type='checkbox']");

// Load saved state
checkboxes.forEach((box, i) => {
  const saved = localStorage.getItem("dhikr_" + i);
  if (saved === "true") box.checked = true;

  box.addEventListener("change", () => {
    localStorage.setItem("dhikr_" + i, box.checked);
  });
});
