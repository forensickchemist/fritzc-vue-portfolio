<script setup>
import { services } from '../../data/portfolio'
</script>

<template>
  <section id="landing" class="landing-section">
    <!-- CSS Aurora background -->
    <div class="aurora-background" aria-hidden="true">
      <div class="aurora-glow aurora-glow-one"></div>
      <div class="aurora-glow aurora-glow-two"></div>
      <div class="aurora-glow aurora-glow-three"></div>
      <div class="aurora-overlay"></div>
    </div>

    <div class="container landing-container">
      <div class="landing-text text-center">
        <p class="landing-subtitle">
          Welcome! I'm Fritz C.
        </p>

        <h1 class="landing-title">
          I build digital systems that help businesses
          <span class="highlight-word">grow, scale,</span> and
          <span class="highlight-word">operate smarter</span>
        </h1>

        <p class="landing-description">
          I design and develop modern web applications, data-driven dashboards,
          and automation solutions that improve performance, streamline
          workflows, and strengthen online presence.
        </p>

        <div
          class="landing-services"
          aria-label="Core services"
        >
          <span
            v-for="service in services"
            :key="service"
            class="service-pill"
          >
            {{ service }}
          </span>
        </div>

        <div class="landing-buttons">
          <a href="#projects" class="btn btn-dark">
            View My Work
          </a>

          <a href="#contact" class="btn btn-outline-dark">
            Let's Work Together
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ============================================================
   LANDING SECTION
   ============================================================ */

.landing-section {
  position: relative;
  min-height: calc(100svh - 76px);
  display: grid;
  place-items: center;
  overflow: hidden;
  isolation: isolate;
  background: var(--color-bg);
}

/* ============================================================
   CSS AURORA BACKGROUND
   ============================================================ */

.aurora-background {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

/* ============================================================
   AURORA RIBBON 1 — PRIMARY TEAL
   ============================================================ */

.aurora-glow-one {
  position: absolute;
  width: 130%;
  height: 75%;
  top: -35%;
  left: -15%;

  background:
    radial-gradient(
      ellipse 45% 35% at 30% 70%,
      var(--color-teal) 0%,
      rgba(15, 163, 177, 0.8) 25%,
      transparent 70%
    );

  opacity: 0.75;
  filter: blur(35px);
  transform: rotate(-14deg);
}

/* ============================================================
   AURORA RIBBON 2 — DEEP TEAL
   ============================================================ */

.aurora-glow-two {
  position: absolute;
  width: 125%;
  height: 80%;
  top: -5%;
  right: -35%;

  background:
    radial-gradient(
      ellipse 42% 30% at 65% 45%,
      var(--color-deep-teal) 0%,
      rgba(11, 110, 121, 0.9) 28%,
      transparent 72%
    );

  opacity: 0.70;
  filter: blur(42px);
  transform: rotate(20deg);
}

/* ============================================================
   AURORA RIBBON 3 — GOLD
   ============================================================ */

.aurora-glow-three {
  position: absolute;
  width: 100%;
  height: 65%;
  bottom: -35%;
  left: 5%;

  background:
    radial-gradient(
      ellipse 38% 30% at 50% 25%,
      var(--color-gold) 0%,
      rgba(184, 134, 11, 0.7) 25%,
      transparent 70%
    );

  opacity: 0.35;
  filter: blur(55px);
  transform: rotate(-10deg);
}

/* ============================================================
   AURORA RIBBON 4 — CENTRAL GLOW
   ============================================================ */

.aurora-background::before {
  content: '';
  position: absolute;

  width: 120%;
  height: 65%;
  top: 15%;
  left: -10%;

  background:
    radial-gradient(
      ellipse 45% 25% at 45% 50%,
      var(--color-teal) 0%,
      rgba(15, 163, 177, 0.65) 30%,
      transparent 72%
    );

  opacity: 0.55;
  filter: blur(50px);
  transform: rotate(-6deg);
}

/* ============================================================
   AURORA RIBBON 5 — SECONDARY HIGHLIGHT
   ============================================================ */

.aurora-background::after {
  content: '';
  position: absolute;

  width: 90%;
  height: 45%;
  top: 35%;
  right: -20%;

  background:
    radial-gradient(
      ellipse 40% 25% at 50% 50%,
      var(--color-teal) 0%,
      transparent 70%
    );

  opacity: 0.40;
  filter: blur(45px);
  transform: rotate(12deg);
}

/* ============================================================
   READABILITY OVERLAY
   ============================================================ */

.aurora-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      180deg,
      var(--color-bg) 0%,
      transparent 25%,
      transparent 70%,
      var(--color-bg) 100%
    );

  opacity: 0.40;
}

/* ============================================================
   LANDING CONTENT
   ============================================================ */

.landing-container {
  position: relative;
  z-index: 1;
  width: 100%;
  padding-block: clamp(4rem, 10vw, 7rem);
}

.landing-text {
  max-width: 1100px;
  margin-inline: auto;
}

.landing-subtitle {
  margin-bottom: 0.75rem;
  font-family: var(--font-label);
  font-size: var(--text-label-lg);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-label);
}

.landing-title {
  max-width: 1000px;
  margin: 0 auto 1.25rem;
  font-family: var(--font-heading);
  font-size: var(--text-display-xl);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.05;
  color: var(--color-text-h);
}

.landing-description {
  max-width: 700px;
  margin: 0 auto 1.75rem;
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  color: var(--color-text-muted);
  line-height: 1.7;
}

/* ============================================================
   SERVICES
   ============================================================ */

.landing-services {
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  flex-wrap: wrap;
  margin-bottom: 1.875rem;
}

.service-pill {
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-deep-teal);
  border-radius: 999px;
  color: var(--color-text-feat);
  background: var(--color-bg);
  font-family: var(--font-label);
  font-size: var(--text-body-sm);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;
}

.service-pill:hover {
  transform: translateY(-2px);
  background: var(--color-teal);
  border-color: var(--color-teal);
  color: #fff;
}

/* ============================================================
   BUTTONS
   ============================================================ */

.landing-buttons {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.landing-buttons .btn {
  min-width: 160px;
  padding: 0.625rem 1.375rem;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: var(--text-ui-md);
  font-weight: 600;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease;
}

.landing-buttons .btn:hover {
  transform: translateY(-1px);
}

.landing-buttons .btn-dark {
  background: var(--color-deep-teal);
  border-color: var(--color-deep-teal);
}

.landing-buttons .btn-dark:hover {
  background: var(--color-teal);
  border-color: var(--color-teal);
}

.landing-buttons .btn-outline-dark {
  border-color: var(--color-text-h);
  color: var(--color-text-h);
}

.landing-buttons .btn-outline-dark:hover {
  background: var(--color-text-h);
  color: var(--color-bg);
}

/* ============================================================
   MOBILE
   ============================================================ */

@media (max-width: 575.98px) {
  .landing-container {
    padding-block: 3.5rem;
  }

  .landing-title {
    font-size: clamp(2rem, 11vw, 3rem);
  }

  .landing-services {
    gap: 0.5rem;
  }

  .service-pill {
    padding: 0.45rem 0.75rem;
    font-size: 11px;
  }

  .landing-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .landing-buttons .btn {
    width: 100%;
  }

  /*
   * Reduce the glow intensity on smaller screens where
   * the content occupies more of the viewport.
   */
  .aurora-glow-one {
    opacity: 0.15;
  }

  .aurora-glow-two {
    opacity: 0.12;
  }

  .aurora-glow-three {
    opacity: 0.05;
  }

  .aurora-overlay {
    opacity: 0.52;
  }
}
</style>