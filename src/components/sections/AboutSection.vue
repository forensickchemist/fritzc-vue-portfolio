<template>
  <section id="about" class="section about-section">
    <div class="container">
      <header class="about-header">
        <h2>ABOUT</h2>
      </header>

      <div class="about-grid">
        <div class="about-image-wrap">
          <img
            src="/images/about/memoji.jpg"
            alt="Developer Profile Picture"
            class="about-img"
            loading="lazy"
          />

          <div class="resume-actions">
            <a
              href="/documents/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="resume-button resume-button-primary"
            >
              <i class="bi bi-eye-fill" aria-hidden="true"></i>
              View Resume
            </a>

            <a
              href="/documents/Fritz-C-Resume.pdf"
              download
              class="resume-button resume-button-secondary"
            >
              <i class="bi bi-file-earmark-pdf-fill" aria-hidden="true"></i>
              Download Resume
            </a>
          </div>
        </div>

        <div class="about-content">
          <h3>
            Hi, I'm <span class="highlight-word">Fritz</span>!
          </h3>

          <p class="job-title">
            Full Stack Developer | MERN &amp; MEVN | Data-Driven Problem Solver
          </p>

          <p>
            I'm a developer with hands-on familiarity with the MERN and MEVN
            stacks, along with experience working with data and backend
            systems. I enjoy building applications that connect frontend
            experiences, APIs, databases, and practical data workflows.
          </p>

          <p>
            I'm not going to claim that I'm perfect at coding. What I have
            learned through the bootcamps and training I've completed is how
            to break problems down, troubleshoot effectively, and figure things
            out. Understanding the software development lifecycle, data
            structures and algorithms, and database design also helps me work
            effectively with AI tools and write better, more precise prompts
            when using them to build and solve problems.
          </p>

          <p>
            Outside of development, I enjoy watching football and WTA tennis
            during my free time. I also explore music by discovering new
            artists, learning instruments, and experimenting with music
            production. I collect and read graphic novels and enjoy cooking
            whenever I get the chance.
          </p>

          <p>
            On the technical side, I've been setting up my own home network
            using Proxmox and I'm currently planning to build a personal
            homelab server to explore system administration and
            infrastructure more deeply. I'm also actively learning
            cybersecurity fundamentals to better understand how systems are
            secured and improved.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding-block: clamp(4rem, 8vw, 5rem);
}

.about-header {
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

.about-header h2 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: var(--text-heading-xl);
  font-weight: 700;
  letter-spacing: -0.018em;
  color: var(--color-text-h);
}

.about-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.75fr) minmax(0, 1.25fr);
  gap: clamp(2rem, 6vw, 4rem);
  align-items: center;
}

.about-image-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.about-img {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1 / 1;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.about-img:hover {
  transform: scale(1.03);
}

/* ============================================================
   RESUME ACTIONS
   ============================================================ */

.resume-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
  flex-wrap: wrap;
}

.resume-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  min-width: 150px;
  padding: 0.7rem 1.15rem;

  border-radius: 8px;

  font-family: var(--font-body);
  font-size: var(--text-ui-md);
  font-weight: 600;

  text-decoration: none;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

/* ============================================================
   VIEW RESUME
   ============================================================ */

.resume-button-primary {
  border: 1px solid var(--color-deep-teal);
  background: var(--color-deep-teal);
  color: #fff;
}

.resume-button-primary:hover {
  background: var(--color-teal);
  border-color: var(--color-teal);
  color: #fff;
  transform: translateY(-2px);
}

/* ============================================================
   DOWNLOAD RESUME
   ============================================================ */

.resume-button-secondary {
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-h);
}

.resume-button-secondary:hover {
  border-color: var(--color-teal);
  background: var(--color-soft-teal);
  color: var(--color-text-h);
  transform: translateY(-2px);
}

/* ============================================================
   ACCESSIBILITY
   ============================================================ */

.resume-button:focus-visible {
  outline: 2px solid var(--color-teal);
  outline-offset: 3px;
}

.resume-button i {
  font-size: 1rem;
}

/* ============================================================
   ABOUT CONTENT
   ============================================================ */

.about-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about-content h3 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: var(--text-heading-lg);
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--color-text-h);
}

.job-title {
  margin: 0;
  font-family: var(--font-label);
  font-size: var(--text-label-lg);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-label);
}

.about-content p {
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--text-body-md);
  color: var(--color-text-muted);
  line-height: 1.7;
}

/* ============================================================
   TABLET / MOBILE
   ============================================================ */

@media (max-width: 991.98px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-image-wrap {
    order: 0;
  }

  .about-content {
    max-width: 760px;
    margin-inline: auto;
  }
}

@media (max-width: 575.98px) {
  .resume-button {
    width: 100%;
    max-width: 320px;
  }
}
</style>