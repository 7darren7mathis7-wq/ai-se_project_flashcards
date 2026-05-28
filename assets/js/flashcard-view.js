import { hexToString, removeColorClasses } from "./colorMap.js";

const flashcardViewSection = document.querySelector("#flashcard-view");
const flashcardTemplateEl = document.querySelector("#flashcard-template");

function getCardColorClass(color) {
  const colorName = hexToString(color) || "green";
  return `card_color_${colorName}`;
}

/**
 * Creates a flashcard element for the flashcard view
 */
function createFlashcardEl(card, deck) {
  const flashcardEl = flashcardTemplateEl.content
    .querySelector(".card")
    .cloneNode(true);

  const flashcardTitleEl = flashcardEl.querySelector(".card__title");
  const flipBtn = flashcardEl.querySelector(".flashcard-flip-btn");
  const deleteBtn = flashcardEl.querySelector(".card__delete-btn");

  flashcardTitleEl.textContent = card.question;

  removeColorClasses(flashcardEl);
  flashcardEl.classList.add(getCardColorClass(deck.color));

  flipBtn.onclick = () => {
    const isQuestion = flashcardTitleEl.textContent === card.question;
    flashcardTitleEl.textContent = isQuestion ? card.answer : card.question;

    if (isQuestion) {
      flashcardEl.classList.add("card--flipped");
    } else {
      flashcardEl.classList.remove("card--flipped");
    }
  };

  deleteBtn.onclick = (event) => {
    event.stopPropagation();
    const cardIndex = deck.cards.findIndex(
      (cardItem) => cardItem.question === card.question,
    );
    if (cardIndex > -1) {
      deck.cards.splice(cardIndex, 1);
      flashcardEl.remove();
    }
  };

  return flashcardEl;
}

/**
 * Renders the flashcard view for a specific deck
 */
export function renderFlashcardView(deck) {
  const flashcardViewContainerEl =
    flashcardViewSection.querySelector(".gallery__list");
  const flashcardViewTitleEl =
    flashcardViewSection.querySelector(".gallery__title");

  flashcardViewContainerEl.replaceChildren();
  flashcardViewTitleEl.textContent = deck.name;

  deck.cards.forEach((card) => {
    const flashcardEl = createFlashcardEl(card, deck);
    flashcardViewContainerEl.prepend(flashcardEl);
  });
}
