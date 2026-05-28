import { decks } from "./decks.js";
import { renderCarouselView } from "./carousel.js";
import { renderFlashcardView } from "./flashcard-view.js";
import { hexToString, removeColorClasses } from "./colorMap.js";

let currentDeck = null;

const homeSection = document.querySelector("#home");
const carouselSection = document.querySelector("#carousel");
const flashcardViewSection = document.querySelector("#flashcard-view");
const aboutSection = document.querySelector("#about");
const notFoundSection = document.querySelector("#not-found");
const galleryContainerEl = document.querySelector(".gallery__list");
const deckTemplateEl = document.querySelector("#deck-template");

function clearGalleryList() {
  galleryContainerEl.replaceChildren();
}

function getCardColorClass(color) {
  const colorName = hexToString(color) || "green";
  return `card_color_${colorName}`;
}

// --- REQUIRED FUNCTIONS FOR STEP 2 ---

/**
 * Creates, clones, and customizes the card element
 */
function createCardEl(deck) {
  const cardEl = deckTemplateEl.content.querySelector(".card").cloneNode(true);

  const cardTitleEl = cardEl.querySelector(".card__title");
  const cardCountEl = cardEl.querySelector(".card__count");
  const cardLinkEl = cardEl.querySelector(".card__link");
  const deleteBtn = cardEl.querySelector(".card__delete-btn");

  cardTitleEl.textContent = deck.name;
  cardCountEl.textContent = `${deck.cards.length} cards`;
  cardLinkEl.href = `#flashcard-view/${deck.id}`;

  removeColorClasses(cardEl);
  cardEl.classList.add(getCardColorClass(deck.color));

  deleteBtn.onclick = (event) => {
    event.stopPropagation();
    const deckIndex = decks.findIndex((deckItem) => deckItem.id === deck.id);
    if (deckIndex > -1) {
      decks.splice(deckIndex, 1);
      cardEl.remove(); // Efficiently removes just this element
    }
  };

  return cardEl;
}

/**
 * Uses createCardEl to get an element and prepends it to the list
 */
function renderCardEl(deck) {
  const cardEl = createCardEl(deck);
  galleryContainerEl.prepend(cardEl);
}

// --- VIEW RENDERING FUNCTIONS ---

function renderHomeView() {
  homeSection.style.display = "block";
  carouselSection.style.display = "none";
  flashcardViewSection.style.display = "none";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "none";

  // Remove carousel-specific class when on home
  document.body.classList.remove("page__main-content_location_carousel");

  clearGalleryList();

  // Pass renderCardEl as a callback
  decks.forEach(renderCardEl);
}

function renderAboutView() {
  homeSection.style.display = "none";
  carouselSection.style.display = "none";
  flashcardViewSection.style.display = "none";
  aboutSection.style.display = "block";
  notFoundSection.style.display = "none";
  document.body.classList.remove("page__main-content_location_carousel");
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  carouselSection.style.display = "none";
  flashcardViewSection.style.display = "none";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "block";
  document.body.classList.remove("page__main-content_location_carousel");
}

// --- ROUTER ---

function router() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "home" || hash === "") {
    renderHomeView();
  } else if (hash === "about") {
    renderAboutView();
  } else if (hash.startsWith("flashcard-view/")) {
    const deckId = hash.split("/")[1];
    const deck = decks.find((deckItem) => deckItem.id === deckId);

    if (!deck) {
      renderNotFoundView();
      return;
    }

    currentDeck = deck;

    homeSection.style.display = "none";
    carouselSection.style.display = "none";
    flashcardViewSection.style.display = "flex";
    aboutSection.style.display = "none";
    notFoundSection.style.display = "none";

    document.body.classList.remove("page__main-content_location_carousel");

    renderFlashcardView(deck);
  } else if (hash.startsWith("carousel/")) {
    const deckId = hash.split("/")[1];
    const deck = decks.find((deckItem) => deckItem.id === deckId);

    if (!deck) {
      renderNotFoundView();
      return;
    }

    homeSection.style.display = "none";
    carouselSection.style.display = "flex"; // Using flex for positioning
    flashcardViewSection.style.display = "none";
    aboutSection.style.display = "none";
    notFoundSection.style.display = "none";

    // Add carousel-specific class
    document.body.classList.add("page__main-content_location_carousel");

    // Pass the entire deck object, not just the ID
    renderCarouselView(deck);
  } else {
    renderNotFoundView();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  router();

  const practiceBtn = document.querySelector(".flashcard-practice-btn");
  if (practiceBtn) {
    practiceBtn.onclick = () => {
      if (currentDeck) {
        window.location.hash = `#carousel/${currentDeck.id}`;
      }
    };
  }
});
window.addEventListener("hashchange", router);
