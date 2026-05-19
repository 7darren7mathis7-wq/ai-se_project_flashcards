import { decks } from "./decks.js";
import { renderCarouselView } from "./carousel.js";
import { hexToString, removeColorClasses } from "./colorMap.js";

const homeSection = document.querySelector("#home");
const carouselSection = document.querySelector("#carousel");
const aboutSection = document.querySelector("#about");
const notFoundSection = document.querySelector("#not-found");
const deckContainerEl = document.querySelector(".decks__list");
const deckTemplateEl = document.querySelector("#deck-template");

function clearDeckList() {
  deckContainerEl.replaceChildren();
}

function getDeckColorClass(color) {
  const colorName = hexToString(color) || "green";
  return `deck_color_${colorName}`;
}

// --- REQUIRED FUNCTIONS FOR STEP 2 ---

/**
 * Creates, clones, and customizes the deck element
 */
function createDeckEl(deck) {
  const deckEl = deckTemplateEl.content.querySelector(".deck").cloneNode(true);

  const deckTitleEl = deckEl.querySelector(".deck__title");
  const deckCountEl = deckEl.querySelector(".deck__count");
  const deckLinkEl = deckEl.querySelector(".deck__link");
  const deleteBtn = deckEl.querySelector(".deck__delete-btn");

  deckTitleEl.textContent = deck.name;
  deckCountEl.textContent = `${deck.cards.length} cards`;
  deckLinkEl.href = `#carousel/${deck.id}`;

  removeColorClasses(deckEl);
  deckEl.classList.add(getDeckColorClass(deck.color));

  deleteBtn.onclick = (event) => {
    event.stopPropagation();
    const deckIndex = decks.findIndex((deckItem) => deckItem.id === deck.id);
    if (deckIndex > -1) {
      decks.splice(deckIndex, 1);
      deckEl.remove(); // Efficiently removes just this element
    }
  };

  return deckEl;
}

/**
 * Uses createDeckEl to get an element and prepends it to the list
 */
function renderDeckEl(deck) {
  const deckEl = createDeckEl(deck);
  deckContainerEl.prepend(deckEl);
}

// --- VIEW RENDERING FUNCTIONS ---

function renderHomeView() {
  homeSection.style.display = "block";
  carouselSection.style.display = "none";
  aboutSection.style.display = "none";
  notFoundSection.style.display = "none";

  // Remove carousel-specific class when on home
  document.body.classList.remove("page__main-content_location_carousel");

  clearDeckList();

  // Pass renderDeckEl as a callback
  decks.forEach(renderDeckEl);
}

function renderAboutView() {
  homeSection.style.display = "none";
  carouselSection.style.display = "none";
  aboutSection.style.display = "block";
  notFoundSection.style.display = "none";
  document.body.classList.remove("page__main-content_location_carousel");
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  carouselSection.style.display = "none";
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
  } else if (hash.startsWith("carousel/")) {
    const deckId = hash.split("/")[1];
    const deck = decks.find((deckItem) => deckItem.id === deckId);

    if (!deck) {
      renderNotFoundView();
      return;
    }

    homeSection.style.display = "none";
    carouselSection.style.display = "flex"; // Using flex for positioning
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

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
