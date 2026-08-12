# Project Architecture

## Overview

This project is a personal portfolio built with Vue 3 and Vite.

The architecture separates the portfolio's content, application logic, reusable UI, page sections, layout components, and global styling. The structure is intentionally kept simple so that the project remains easy to maintain and extend as new portfolio work and functionality are added.

The current portfolio is a functional presentation site. The Projects section currently uses placeholders for future projects, while the Tools section represents technologies and software that I am genuinely familiar with. The resume is available for viewing and downloading, and the contact form currently provides the frontend interface for future backend integration.

---

## Directory Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── Footer.vue
│   │   └── Navbar.vue
│   ├── sections/
│   │   ├── AboutSection.vue
│   │   ├── ContactSection.vue
│   │   ├── LandingSection.vue
│   │   ├── ProjectsSection.vue
│   │   └── ToolsSection.vue
│   └── ui/
│       ├── SectionHeader.vue
│       └── ThemeToggle.vue
├── composables/
│   └── useTheme.js
├── data/
│   └── portfolio.js
├── styles/
│   └── global.css
├── App.vue
└── main.js

public/
├── documents/
│   └── CV.pdf
└── images/
    ├── about/
    ├── brand/
    └── tools/