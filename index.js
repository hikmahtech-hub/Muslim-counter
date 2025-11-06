document.addEventListener("DOMContentLoaded", () => {
  let counter = 0;
  let currentAudio = null;

  const decreaseBtn = document.getElementById("decreaseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const increaseBtn = document.getElementById("increaseBtn");
  const counterLabel = document.getElementById("counterLabel");
  const counterText = document.getElementById("countingText");
  const successSound = document.getElementById("successMusic");
  const clickSound = new Audio("button-click(chosic.com).mp3");

  const dhikrMap = {
    "Astaghfirullah — 3 times": { file: "dhikr1.m4a", start: 0, end: 10 },
    "Allahumma antas-salam wa minkas-salam… — 1 time": { file: "dhikr1.m4a", start: 11, end: 22 },
    "Laa ilaaha illallahu wahdahu… — 1 time": { file: "dhikr2.m4a", start: 0, end: 27 },
    "Laa ilaaha illallahu wahdahu… extended — 1 time": { file: "dhikr3.m4a", start: 0, end: 46 },
    "Subhanallah — 33 times": { file: "dhikr12.m4a", start: 0, end: 7 },
    "Alhamdulillah — 33 times": { file: "dhikr12.m4a", start: 8, end: 14 },
    "Allahu Akbar — 33 times": { file: "dhikr12.m4a", start: 15, end: 21 },
    "Lahaula walakuwata illabillah — 1 times": { file: "dhikr12.m4a", start: 21, end: 27 },
    "Laa ilaaha illallahu wahdahu… (Fajr & Maghrib) — 10 times": { file: "dhikr5.m4a", start: 0, end: 14 },
    "Allahumma inni as’aluka… — 1 time (after Fajr)": { file: "dhikr6.wav", start: 0, end: 20 },
    "Rabbi qinee ‘adhabaka… — 1 time": { file: "dhikr11.m4a", start: 0, end: 7 },
    "Allahummaghfirli ma qaddamtu… — 1 time": { file: "dhikr7.m4a", start: 0, end: 43 },
    "Allahumma inni as’aluka fi’lal-khayraat… — 1 time": { file: "dhikr8.wav", start: 0, end: 69 },
    "Allahumma a’inni ala dhikrika… — 1 time": { file: "dhirkr10.mp3", start: 0, end: 145 },
    "Ayat al-Kursi (Surah Al-Baqarah 2:255) — 1x daily (3x after Fajr & Maghrib)": { file: "dhikr13.mp3", start: 0, end: 114 },
    "Surah Al-Ikhlas (Q112) — 1x daily (3x after Fajr & Maghrib)": { file: "dhikr112.mp3", start: 0, end: 112 },
    "Surah Al-Falaq (Q113) — 1x daily (3x after Fajr & Maghrib)": { file: "dhikr113.mp3", start: 0, end: 33 },
    "Surah An-Nas (Q114) — 1x daily (3x after Fajr & Maghrib)": { file: "dhikr114.mp3", start: 0, end: 50 },
    "Subhanaka Allahumma wa bihamdika… — 1 time": { file: "dhikr14.m4a", start: 0, end: 48 },
  };

  const checkboxes = document.querySelectorAll("#adhkar input[type='checkbox']");

  // Counter functions
  function updateCounterDisplay() {
    counterLabel.textContent = counter;
    clickSound.play().catch(err => console.log(err));

    if (counter === 33 || counter === 100) {
      counterText.textContent = "Masha Allah! You are doing great — Ahsanta!";
      successSound.currentTime = 0;
      successSound.play();
    } else {
      counterText.textContent = "Keep going with dhikr 💫";
    }
  }

  increaseBtn.onclick = () => { counter++; updateCounterDisplay(); };
  decreaseBtn.onclick = () => { counter--; updateCounterDisplay(); };
  resetBtn.onclick = () => { counter = 0; updateCounterDisplay(); };

  // Load saved state and play dhikr
  checkboxes.forEach((box, i) => {
    const saved = localStorage.getItem("dhikr_" + i);
    if (saved === "true") box.checked = true;

    box.addEventListener("change", () => {
      localStorage.setItem("dhikr_" + i, box.checked);

      if (box.checked) {
        const text = box.parentNode.textContent.trim();
        const dhikr = dhikrMap[text];
        console.log("Checkbox:", text, "DHikr found:", dhikr); // debug

        if (dhikr) {
          if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
          }

          currentAudio = new Audio(dhikr.file);
          currentAudio.addEventListener("loadedmetadata", () => {
            currentAudio.currentTime = dhikr.start;
            setTimeout(() => currentAudio.play().catch(err => console.log(err)), 50);

            const stopAudio = () => {
              if (currentAudio.currentTime >= dhikr.end) {
                currentAudio.pause();
                currentAudio.removeEventListener("timeupdate", stopAudio);
                currentAudio = null;
              }
            };

            currentAudio.addEventListener("timeupdate", stopAudio);
          });
        }
      }
    });
  });
});
