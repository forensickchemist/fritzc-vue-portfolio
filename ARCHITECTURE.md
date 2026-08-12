
---
# Application Architecture

## Overview

FritzC Dev is a single-page portfolio website built with Vue 3 and Vite.

The application follows a component-based structure where the page is divided into reusable layout components, content sections, and smaller UI components. Portfolio content is separated from presentation where practical, while reusable application logic is handled through Vue composables.

The architecture is intentionally lightweight. The project does not currently require a router, database, custom backend, or state-management library.

The primary goals of the architecture are:

- Maintainability
- Reusability
- Clear separation of concerns
- Responsive presentation
- Consistent visual design
- Easy content updates
- Room for future expansion

---

## Technology Stack

### Vue 3

Vue provides the application's component-based UI architecture.

The Composition API is used through `<script setup>` for component logic and reusable reactive state.

### Vite

Vite provides the development environment and production build system.

It is responsible for:

- Local development
- Module bundling
- Production builds
- Environment variable handling

### JavaScript

JavaScript is used for application logic, reactive state, data structures, and interaction handling.

### HTML5

Semantic HTML elements are used to structure the portfolio and improve accessibility.

### CSS3

The application uses component-scoped styles alongside a global design system.

CSS handles:

- Layout
- Responsive behavior
- Typography
- Colors
- Spacing
- Component states
- Light and dark themes
- Reduced-motion behavior

### Bootstrap Icons

Bootstrap Icons are used for interface and navigation iconography where appropriate.

### Google Fonts

Google Fonts provide the typography used by the portfolio.

### Web3Forms

Web3Forms handles contact form submissions without requiring a custom backend for the current implementation.

The Web3Forms access key is supplied through a Vite environment variable rather than being hardcoded into the component source.

### Notyf

Notyf provides visual feedback for contact form submission states, including successful and unsuccessful submissions.

---

# Application Structure
```
public/
├── documents/
│   └── CV.pdf
│
└── images/
    ├── about/
    │   └── memoji.jpg
    │
    ├── brand/
    │   ├── lowerblack.png
    │   └── lowerwhite.png
    │
    └── tools/
        └── technology and tool assets


src/
├── components/
│   ├── layout/
│   │   ├── Footer.vue
│   │   └── Navbar.vue
│   │
│   ├── sections/
│   │   ├── AboutSection.vue
│   │   ├── ContactSection.vue
│   │   ├── LandingSection.vue
│   │   ├── ProjectsSection.vue
│   │   └── ToolsSection.vue
│   │
│   └── ui/
│       ├── SectionHeader.vue
│       └── ThemeToggle.vue
│
├── composables/
│   └── useTheme.js
│
├── data/
│   └── portfolio.js
│
├── styles/
│   └── global.css
│
├── App.vue
└── main.js
```