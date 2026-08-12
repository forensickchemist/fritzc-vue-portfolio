# FritzC Dev Portfolio

A personal developer portfolio built with Vue 3 and Vite to showcase my background, technical experience, selected projects, and professional profile.

The project is both a personal portfolio and a practical demonstration of how I approach frontend development, component organization, responsive UI, third-party service integration, and deployment.

## Overview

The portfolio provides visitors with a concise view of my professional background and technical capabilities through several dedicated sections:

- Introduction and personal profile
- About section
- Projects section
- Tools and technologies
- Resume
- Contact form
- Social links

The Projects section currently contains placeholders for future projects. The structure is intentionally prepared so completed projects and case studies can be added as they become available.

## Purpose
This project is more than a static portfolio. It is an ongoing demonstration of my ability to design, structure, develop, and maintain a modern web application while keeping the implementation practical and maintainable.

## Key Features

### Responsive Interface
The portfolio is designed to provide a consistent experience across desktop, tablet, and mobile devices.

### Light and Dark Themes
Users can switch between light and dark themes through the site's theme toggle.

### Resume Access
Visitors can view my resume directly in the browser or download a copy for later reference.

### Contact Form
The contact section provides a form for prospective employers, collaborators, and other visitors to send inquiries.

The form uses Cloudflare Turnstile for bot protection and Formtorch for form processing and email delivery.

The submission flow is:

```
Contact Form
     ↓
Cloudflare Turnstile
     ↓
Vercel Serverless API
     ↓
Formtorch
     ↓
Email
```

The contact form does not currently use a custom database. A database-backed contact system may be considered as a future improvement.

## Component-Based Architecture
The application is organized into reusable Vue components and composables rather than keeping the entire portfolio in a single component.

The Contact section, for example, is divided into separate components for the form, map, and social links, while Turnstile functionality is handled through a dedicated composable.

More information about the project's structure is available in ARCHITECTURE.md

## Technology Stack
- Core
    - Vue 3
    - Vite
    - JavaScript
    - HTML5
    - CSS3

- UI
    - Bootstrap 5
    - Bootstrap Icons
    - Notyf

- Services
    - Cloudflare Turnstile
    - Formtorch
    - Vercel


## Project Structure
The project follows a component-based Vue structure:
```
├── api/             # Serverless API endpoints
├── public/          # Static assets and resume
├── src/
│   ├── components/  # Layout, sections, and UI components
│   ├── composables/ # Reusable Vue logic
│   ├── data/        # Portfolio data
│   └── styles/      # Global styles
├── index.html
├── package.json
└── vite.config.js
```
For the complete structure and directory responsibilities, see ARCHITECTURE.md.

## Getting Started
#### Prerequisites
Make sure you have Node.js and npm installed.

#### Installation
Clone the repository and install the project dependencies:
```
git clone <repository-url>
cd fritzc-vue-portfolio
npm install
```

#### Environment Variables
Create a .env file in the project root:
```
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
```

The Turnstile site key is a public client-side key.

The corresponding secret key is not exposed in the frontend application and is configured for server-side verification.

#### Development
Start the Vite development server:
```
npm run dev
```

#### Production Build
Create a production build:
```
npm run build
```

#### Preview
Preview the production build locally:
```
npm run preview
```

## Deployment
The portfolio is deployed through Vercel.

Vercel provides both the hosting environment for the Vue application and the serverless API used by the contact form.

Production environment variables are configured through the Vercel project settings.

## Future Improvements
The project is intended to evolve as my portfolio grows.

Potential improvements include:
- Replacing project placeholders with completed projects
- Adding detailed project case studies
- Expanding contact functionality
- Introducing a database-backed contact system
- Adding analytics
- Further improving accessibility and performance
- Adding automated testing

## License
This is a personal portfolio project.

The source code and original assets are not intended for redistribution as a commercial template.



