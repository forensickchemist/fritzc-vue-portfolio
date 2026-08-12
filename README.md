# FritzC Dev — Developer Portfolio

A personal portfolio website built with Vue 3 and Vite to present my technical skills, professional background, tools, and selected work to prospective employers.

The portfolio is designed as both a professional introduction and an evolving showcase of my development, analytics, and digital skills. The current version focuses on establishing the site's visual identity, responsive structure, technical capabilities, and professional information, while leaving room for future projects and functionality.

## Tech Stack

- Vue 3
- Vite
- JavaScript
- HTML5
- CSS3
- Bootstrap Icons
- Google Fonts

## Features

- Responsive portfolio layout
- Light and dark theme support
- Reusable Vue components
- Data-driven project and portfolio content
- Responsive navigation
- Project showcase
- Technical tools and technologies section
- About section
- Contact section
- Downloadable CV
- Responsive footer and navigation
- Accessibility-conscious interactive elements
- Reduced-motion support

## Project Structure

```
public/
├── documents/       # Public documents such as CV
└── images/          # Brand, profile, and technology assets

src/
├── components/
│   ├── layout/      # Site-wide layout components
│   ├── sections/    # Main portfolio sections
│   └── ui/          # Reusable interface components
├── composables/     # Reusable Vue logic
├── data/            # Portfolio content and configuration
├── styles/          # Global design system and styles
├── App.vue          # Application root
└── main.js          # Application entry point
```

## Pages/Content
```
├── Hero
├── Projects
├── Tools & Technologies
├── About
├── Resume
└── Contact
```

### Hero

A personal introduction that communicates my professional focus and provides quick access to my work and resume.

### Projects

The Projects section currently contains **placeholder project entries** that establish the intended structure and presentation for future work.

These placeholders are not presented as completed or existing projects. They provide the visual and structural foundation for adding real projects as they become available.

### Tools & Technologies

The Tools section represents technologies, software, platforms, and development tools that I am genuinely familiar with and have experience using.

These include technologies across areas such as:

- Web development
- Programming
- Data analytics
- Data visualization
- Databases
- Development tools
- Design and prototyping
- API development and testing
- Productivity and collaboration

The technologies presented in this section describe my broader technical experience and are not necessarily technologies used to build this portfolio itself.

### About

Provides additional professional and personal context, helping prospective employers understand my background, interests, and approach to technology.

### Resume

The portfolio provides prospective employers with the option to **view or download my resume** directly from the website.

The current resume is available at:

```text
public/documents/CV.pdf
```

### Contact

The portfolio includes a functional contact form that allows visitors and prospective employers to send inquiries directly through the website.

Form submissions are handled through Web3Forms, while Notyf provides visual feedback for successful and unsuccessful submissions.

The form currently supports:

- Full name
- Email address
- Inquiry type dropdown
- Message

The form does not require a custom application backend. This keeps the current portfolio lightweight while providing a practical way for visitors to make contact.

