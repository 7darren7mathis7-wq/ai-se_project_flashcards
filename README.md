# Flash Card Program

A modern, responsive flashcard application for learning and studying coding concepts. This single-page application (SPA) allows users to create decks of flashcards, manage cards, and practice using an interactive carousel view.

Here is a [link](https://7darren7mathis7-wq.github.io/ai-se_project_flashcards/#home).

## Technologies Used

- **HTML5** - Semantic markup with templates for dynamic content
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JavaScript with modules
- **CSS3** - Modern styling with Flexbox, CSS Grid, and responsive design
- **GitHub Pages** - Static hosting and deployment

## Project Structure

```
Project One/
├── index.html                 # Main HTML file with templates
├── assets/
│   ├── css/
│   │   ├── index.css         # Main stylesheet entry point
│   │   ├── card.css          # Card component styling
│   │   ├── carousel.css      # Carousel view styling
│   │   ├── flashcard-view.css # Flashcard view styling
│   │   ├── gallery.css       # Gallery/deck list styling
│   │   ├── header-nav.css    # Header and navigation styling
│   │   ├── footer.css        # Footer styling
│   │   ├── page.css          # Page layout styling
│   │   └── mobile-view.css   # Mobile responsive styles
│   ├── js/
│   │   ├── index.js          # Main application logic and routing
│   │   ├── carousel.js       # Carousel view functionality
│   │   ├── flashcard-view.js # Flashcard view functionality
│   │   ├── decks.js          # Deck data storage
│   │   └── colorMap.js       # Color mapping utilities
│   └── images/               # SVG icons and images
└── README.md
```

## HTML Architecture

The application uses a single-page architecture with multiple views managed through JavaScript routing. The HTML structure includes:

### Templates

- **Deck Template** (`#deck-template`): Template for creating deck cards in the gallery
- **Flashcard Template** (`#flashcard-template`): Template for individual flashcards

### Views

- **Home View** (`#home`): Gallery view showing all decks
- **Flashcard View** (`#flashcard-view`): Detailed view of a specific deck with all cards
- **Carousel View** (`#carousel`): Interactive practice mode for studying cards
- **About View** (`#about`): Information about the application
- **Not Found View** (`#not-found`): 404 error handling

### Key HTML Features

- Semantic HTML5 elements (`header`, `nav`, `main`, `section`, `footer`)
- Template elements for dynamic content generation
- ARIA labels for accessibility
- Responsive meta tags for mobile optimization

## JavaScript Architecture

### Module System

The application uses ES6 modules for code organization and dependency management:

```javascript
import { decks } from "./decks.js";
import { renderCarouselView } from "./carousel.js";
import { renderFlashcardView } from "./flashcard-view.js";
import { hexToString, removeColorClasses } from "./colorMap.js";
```

### Routing System

The application uses hash-based routing for navigation:

```javascript
function router() {
  const hash = window.location.hash.slice(1) || "home";

  if (hash === "home" || hash === "") {
    renderHomeView();
  } else if (hash === "about") {
    renderAboutView();
  } else if (hash.startsWith("flashcard-view/")) {
    const deckId = hash.split("/")[1];
    const deck = decks.find((deckItem) => deckItem.id === deckId);
    // Render flashcard view
  } else if (hash.startsWith("carousel/")) {
    const deckId = hash.split("/")[1];
    const deck = decks.find((deckItem) => deckItem.id === deckId);
    // Render carousel view
  } else {
    renderNotFoundView();
  }
}
```

The router listens for hash changes and DOMContentLoaded events to handle navigation.

### State Management

- **currentDeck**: Global variable tracking the currently selected deck
- **decks**: Array of deck objects imported from decks.js
- **currentIndex**: Carousel view tracking current card position
- **isFlipped**: Carousel view tracking card flip state

### Key JavaScript Functions

#### Deck Management

- **createCardEl(deck)**: Creates and customizes a deck card element
- **renderCardEl(deck)**: Renders a deck card to the gallery
- **clearGalleryList()**: Clears the gallery list for re-rendering

#### Flashcard View

- **createFlashcardEl(card, deck)**: Creates individual flashcard elements with flip functionality
- **renderFlashcardView(deck)**: Renders all cards for a specific deck

#### Carousel View

- **renderCarouselView(deck)**: Initializes the carousel practice mode
- **updateDisplay()**: Updates the carousel display with current card
- **updateArrows()**: Manages button states based on current position
- **disableButton(buttonEl)**: Disables carousel navigation buttons
- **enableButton(buttonEl)**: Enables carousel navigation buttons

#### Color Management

- **hexToString(color)**: Converts hex color values to CSS class names
- **removeColorClasses(element)**: Removes all color classes from an element

### Event Handling

The application uses event listeners for:

- Navigation (hashchange)
- DOM initialization (DOMContentLoaded)
- Button clicks (practice, delete, flip, navigation)
- Card interactions (flip, delete)

## CSS Architecture

### Modular CSS

The CSS is organized into modular files for maintainability:

- **index.css**: Main entry point importing all CSS modules
- **Component-based**: Each major component has its own CSS file
- **Responsive design**: Mobile-specific styles in mobile-view.css

### Responsive Design

The application uses CSS media queries for responsive design:

```css
@media (max-width: 768px) {
  /* Mobile-specific styles */
  .header {
    flex-direction: row;
  }

  .flashcard-view__footer-btns {
    position: fixed;
    bottom: 32px;
    /* Mobile static buttons */
  }
}
```

### Key CSS Features

- **Flexbox**: Used for layout and component alignment
- **CSS Grid**: Used for gallery layouts
- **Fixed positioning**: Used for mobile static buttons
- **Pseudo-elements**: Used for gradient effects
- **CSS Variables**: Used for consistent theming
- **Transitions**: Used for smooth hover effects
- **Box shadows**: Used for card depth and visual hierarchy

## Features

### Deck Management

- Create new decks with custom names and colors
- View all decks in a gallery layout
- Delete decks with confirmation
- Color-coded decks for visual organization

### Card Management

- Add new cards to decks with questions and answers
- View all cards in a deck
- Delete individual cards
- Flip cards to reveal answers

### Practice Mode

- Interactive carousel view for studying
- Navigate between cards with previous/next buttons
- Flip cards to check answers
- Visual feedback for card states
- Progress tracking (current card / total cards)

### Responsive Design

- Mobile-optimized interface
- Static buttons at bottom on mobile
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

### Color System

- Hex color mapping to CSS classes
- Dynamic color application to cards
- Consistent color theming across views
- Color classes: `card_color_green`, `card_color_yellow`, etc.

## How to Use

### Creating a Deck

1. Click the "+ New Deck" button on the home page
2. Enter a name for your deck
3. Select a color for your deck
4. Your deck will appear in the gallery

### Adding Cards

1. Click on a deck to open the flashcard view
2. Click the "+ New Card" button
3. Enter your question and answer
4. The card will be added to your deck

### Practicing

1. Click the "Practice" button in the flashcard view
2. Use the carousel to navigate through cards
3. Click the flip button to reveal answers
4. Use left/right arrows to move between cards
5. Click "Back to Deck" to return to the flashcard view

### Managing Content

- Delete cards using the delete button on each card
- Delete decks using the delete button on each deck
- Flip cards in flashcard view to see answers

## Technical Details

### Color Mapping System

The application uses a hex-to-string color mapping system:

- Hex colors (e.g., "#f5d770") are converted to CSS class names
- Classes follow the pattern: `card_color_{colorName}`
- This allows dynamic styling based on deck colors

### Template Cloning

The application uses HTML5 templates for efficient DOM manipulation:

- Templates are cloned using `cloneNode(true)`
- Content is dynamically populated
- Event listeners are attached after cloning

### Event Delegation

The application uses direct event listeners on dynamically created elements:

- Each card has its own event listeners
- Delete buttons use `event.stopPropagation()` to prevent triggering card clicks
- Practice buttons are selected using `querySelectorAll` for multiple instances

### View Management

The application manages views through display toggling:

- Views are shown/hidden using `style.display`
- CSS classes are added/removed for view-specific styling
- The router ensures only one view is visible at a time

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Local storage for data persistence
- Card shuffling in practice mode
- Spaced repetition algorithm
- Import/export deck functionality
- Card editing capability
- Statistics and progress tracking
- Multiple language support
