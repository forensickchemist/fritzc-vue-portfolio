# Architecture

## Overview

FritzC Dev Portfolio is a single-page application built with Vue 3 and Vite.

The project uses a component-based structure to separate page sections, reusable UI components, application logic, portfolio data, styling, static assets, and serverless functionality.

The architecture is intentionally lightweight and does not currently require Vue Router, Pinia, or a custom database.

---

## Project Structure

```text
├── api
│   └── contact.js
│
├── public
│   ├── documents
│   │   └── CV.pdf
│   └── images
│       ├── about
│       ├── brand
│       └── tools
│
├── src
│   ├── components
│   │   ├── layout
│   │   │   ├── Footer.vue
│   │   │   └── Navbar.vue
│   │   │
│   │   ├── sections
│   │   │   ├── contact
│   │   │   │   ├── ContactForm.vue
│   │   │   │   ├── ContactMap.vue
│   │   │   │   └── ContactSocials.vue
│   │   │   ├── AboutSection.vue
│   │   │   ├── ContactSection.vue
│   │   │   ├── LandingSection.vue
│   │   │   ├── ProjectsSection.vue
│   │   │   └── ToolsSection.vue
│   │   │
│   │   └── ui
│   │       ├── SectionHeader.vue
│   │       └── ThemeToggle.vue
│   │
│   ├── composables
│   │   ├── useTheme.js
│   │   └── useTurnstile.js
│   │
│   ├── data
│   │   └── portfolio.js
│   │
│   ├── styles
│   │   └── global.css
│   │
│   ├── App.vue
│   └── main.js
│
├── .gitignore
├── ARCHITECTURE.md
├── README.md
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

---

## Directory Responsibilities

### `api/`

Contains serverless API endpoints used by the application.

`contact.js` handles contact form requests and acts as the server-side endpoint used by the frontend contact form.

### `public/`

Contains static assets that are served directly by the application.

This includes the resume, brand images, profile imagery, technology icons, and social media icons.

### `src/components/layout/`

Contains components used for the overall site layout.

- `Navbar.vue` — main navigation
- `Footer.vue` — site footer

### `src/components/sections/`

Contains the major sections displayed on the portfolio page.

- `LandingSection.vue` — landing or introduction section
- `AboutSection.vue` — personal and professional background
- `ProjectsSection.vue` — projects and project placeholders
- `ToolsSection.vue` — tools and technologies
- `ContactSection.vue` — contact area

### `src/components/sections/contact/`

Contains components specific to the contact section.

- `ContactForm.vue` — contact form and submission handling
- `ContactMap.vue` — location map
- `ContactSocials.vue` — social media links

The contact section is separated into smaller components to keep each component focused on a specific responsibility.

### `src/components/ui/`

Contains reusable interface components that are not tied to a single portfolio section.

- `SectionHeader.vue` — reusable section heading
- `ThemeToggle.vue` — light and dark theme control

### `src/composables/`

Contains reusable Vue Composition API logic.

- `useTheme.js` — manages theme behavior
- `useTurnstile.js` — manages Cloudflare Turnstile integration

### `src/data/`

Contains portfolio content and data used by the Vue components.

Keeping content separate from presentation makes it easier to update portfolio information without modifying component structure.

### `src/styles/`

Contains global CSS and shared styling.

Component-specific styles remain within their respective Vue components where appropriate.

---

## Application Structure

`main.js` initializes the Vue application and mounts it to the page.

`App.vue` serves as the main application component and brings together the portfolio layout and major sections.

The general component hierarchy is:

```text
App.vue
│
├── Navbar
├── LandingSection
├── AboutSection
├── ProjectsSection
├── ToolsSection
├── ContactSection
│   ├── ContactMap
│   ├── ContactForm
│   └── ContactSocials
└── Footer
```

This keeps the main application structure easy to follow while allowing individual sections to be maintained independently.

---

## Contact Section

The Contact section is divided into three focused components:

```text
ContactSection.vue
│
├── ContactMap.vue
├── ContactForm.vue
└── ContactSocials.vue
```

`ContactSection.vue` provides the overall section structure.

`ContactMap.vue` handles the embedded location map.

`ContactSocials.vue` handles the social media links.

`ContactForm.vue` is responsible for the contact form and its submission state.

This separation prevents the contact section from becoming a single large component.

---

## Contact Form Flow

The contact form uses Cloudflare Turnstile for bot protection and Formtorch for form processing and email delivery.

The submission flow is:

```text
Visitor
   │
   ▼
ContactForm.vue
   │
   ▼
Cloudflare Turnstile
   │
   │ Turnstile token
   ▼
/api/contact
   │
   ▼
Formtorch
   │
   ▼
Email delivery
```

The frontend is responsible for collecting the form information and obtaining a valid Turnstile token.

The Vercel serverless API provides the backend endpoint used by the frontend.

Formtorch handles the final form processing and email delivery, including the server-side CAPTCHA verification required for the Turnstile-protected form.

---

## Turnstile Integration

Cloudflare Turnstile is integrated through the `useTurnstile.js` composable.

The composable keeps Turnstile-specific logic separate from the form component.

Its responsibilities include:

- Loading the Turnstile script
- Rendering the widget
- Receiving the verification token
- Handling token expiration
- Handling widget errors
- Resetting the widget
- Cleaning up the widget when necessary

The frontend uses the public Turnstile site key through the Vite environment variable:

```env
VITE_TURNSTILE_SITE_KEY=your_site_key
```

The Turnstile secret key is not exposed to the frontend.

---

## Theme Architecture

Theme functionality is handled through the `useTheme.js` composable.

The composable provides the logic required to switch between light and dark themes.

`ThemeToggle.vue` provides the user interface for changing the theme, while `useTheme.js` keeps the theme behavior separate from the component's presentation.

This allows theme functionality to be reused without duplicating the implementation.

---

## Data Architecture

Portfolio content is maintained separately in:

```text
src/data/portfolio.js
```

Components consume the data when rendering portfolio content.

This creates a separation between:

```text
Portfolio data
     │
     ▼
Vue components
     │
     ▼
Rendered interface
```

This approach makes content updates easier and avoids unnecessarily placing static portfolio information directly inside presentation components.

---

## Styling Architecture

The project uses global styles together with component-specific styles.

Global styles are maintained in:

```text
src/styles/global.css
```

Shared styling and application-wide rules are defined there.

Styles that are specific to an individual component can remain within the corresponding `.vue` file.

Bootstrap and Bootstrap Icons are also used where appropriate for layout utilities, responsive behavior, and interface icons.

---

## Static Assets

Static assets are stored in the `public` directory.

The main asset groups are:

```text
public/
├── documents/
│   └── CV.pdf
│
└── images/
    ├── about/
    ├── brand/
    └── tools/
```

The `documents` directory contains the resume.

The `images` directory contains the visual assets used throughout the portfolio.

---

## Deployment Architecture

The application is deployed through Vercel.

Vercel provides both the hosting environment for the frontend and the serverless environment for the contact API.

The high-level deployment flow is:

```text
Vue + Vite Application
          │
          ▼
        Vercel
       /      \
      /        \
Frontend      /api/contact
                 │
                 ▼
             Formtorch
                 │
                 ▼
             Email
```

Environment variables required by the application are configured through the Vercel project settings.

---

## Architectural Principles

The project follows a few simple principles.

### Separation of Concerns

Different responsibilities are kept in appropriate locations.

For example:

- Components handle presentation and component behavior.
- Composables handle reusable application logic.
- Data files contain portfolio content.
- The API handles server-side contact requests.
- Static assets are kept in `public`.

### Componentization

Large sections are divided into smaller components when they contain distinct responsibilities.

The Contact section is an example of this approach.

### Reusable Logic

Reusable functionality is extracted into composables rather than being duplicated across components.

The theme and Turnstile functionality are handled this way.

### Maintainability

The structure is kept simple enough for a personal portfolio while allowing additional content and functionality to be added without requiring a major restructuring of the application.

---

## Current Scope

The current architecture is designed for a single-page portfolio.

It does not currently require:

- Vue Router
- Pinia
- A custom database
- A dedicated backend framework
- Authentication

These can be introduced in the future if the application's requirements grow.

---

## Future Improvements

Potential architectural improvements include:

- Adding completed projects and project case studies
- Introducing additional project-specific pages
- Adding a custom database-backed contact system
- Adding automated testing
- Adding analytics
- Further improving accessibility and performance

The current structure provides a foundation for these improvements without requiring significant changes to the existing application.