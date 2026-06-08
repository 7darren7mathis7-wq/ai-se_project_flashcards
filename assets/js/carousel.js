import { hexToString, removeColorClasses } from "./colorMap.js";

export function renderCarouselView(deck) {
  if (!deck) return;

  let currentIndex = 0;
  let isFlipped = false;

  const carouselEl = document.querySelector(".carousel");
  const titleEl = carouselEl.querySelector(".carousel__title");
  const cardTextEl = carouselEl.querySelector(".carousel__card-text");

  // 1. Grab ALL matching buttons for both layouts using querySelectorAll
  const leftButtons = carouselEl.querySelectorAll(".carousel__btn_type_left");
  const rightButtons = carouselEl.querySelectorAll(".carousel__btn_type_right");
  const flipButtons = carouselEl.querySelectorAll(".carousel__btn_type_flip");

  // Helper to enable/disable all instances of a specific button type
  function toggleButtonState(buttonsList, shouldDisable) {
    buttonsList.forEach((btn) => {
      if (shouldDisable) {
        btn.classList.add("carousel__btn_disabled");
        btn.disabled = true;
      } else {
        btn.classList.remove("carousel__btn_disabled");
        btn.removeAttribute("disabled");
      }
    });
  }

  function updateArrows() {
    // Sync states across both desktop and mobile layouts simultaneously
    toggleButtonState(leftButtons, currentIndex === 0);
    toggleButtonState(rightButtons, currentIndex === deck.cards.length - 1);
  }

  function updateDisplay() {
    const card = deck.cards[currentIndex];
    titleEl.textContent = `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;
    cardTextEl.textContent = isFlipped ? card.answer : card.question;

    const colorName = hexToString(deck.color) || "green";
    removeColorClasses(cardTextEl);
    cardTextEl.classList.add(`carousel__card_color_${colorName}`);

    if (isFlipped) {
      cardTextEl.classList.add("carousel__card-text--flipped");
    } else {
      cardTextEl.classList.remove("carousel__card-text--flipped");
    }

    updateArrows();
  }

  updateDisplay();

  // 2. Loop through and attach event handlers to EVERY button found
  rightButtons.forEach((btn) => {
    btn.onclick = () => {
      if (currentIndex < deck.cards.length - 1) {
        currentIndex++;
        isFlipped = false;
        updateDisplay();
      }
    };
  });

  leftButtons.forEach((btn) => {
    btn.onclick = () => {
      if (currentIndex > 0) {
        currentIndex--;
        isFlipped = false;
        updateDisplay();
      }
    };
  });

  flipButtons.forEach((btn) => {
    btn.onclick = () => {
      isFlipped = !isFlipped;
      updateDisplay();
    };
  });
}
