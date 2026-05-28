import { hexToString, removeColorClasses } from "./colorMap.js";

export function renderCarouselView(deck) {
  if (!deck) return;

  let currentIndex = 0;
  let isFlipped = false;

  const carouselEl = document.querySelector(".carousel");
  const titleEl = carouselEl.querySelector(".carousel__title");
  const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
  const flipBtn = carouselEl.querySelector(".carousel__btn_type_flip");
  const cardTextEl = carouselEl.querySelector(".carousel__card-text");
  const backBtn = carouselEl.querySelector(".carousel__back-btn");

  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }

  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  function updateArrows() {
    if (currentIndex === 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

  function updateDisplay() {
    const card = deck.cards[currentIndex];
    titleEl.textContent = `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;
    cardTextEl.textContent = isFlipped ? card.answer : card.question;

    // 1. Convert hex to string (e.g., "#f5d770" -> "yellow")
    const colorName = hexToString(deck.color) || "green";

    // 2. Clear old classes (prevents color "stacking")
    removeColorClasses(cardTextEl);

    // 3. Add the CAROUSEL specific class
    // Make sure this matches the CSS names above!
    cardTextEl.classList.add(`carousel__card_color_${colorName}`);

    // 4. Add white background when showing answer
    if (isFlipped) {
      cardTextEl.classList.add("carousel__card-text--flipped");
    } else {
      cardTextEl.classList.remove("carousel__card-text--flipped");
    }

    updateArrows();
  }
  updateDisplay();

  rightBtn.onclick = () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      isFlipped = false;
      updateDisplay();
    }
  };

  leftBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      isFlipped = false;
      updateDisplay();
    }
  };

  flipBtn.onclick = () => {
    isFlipped = !isFlipped;
    updateDisplay();
  };

  backBtn.onclick = () => {
    window.location.hash = `#flashcard-view/${deck.id}`;
  };
}
