<script setup>
import { socialLinks } from '../../../data/portfolio';
</script>

<template>
  <div class="social-row">

    <h3>
      Connect With Me
    </h3>

    <div class="social-container">
      <a
        v-for="[name, href, image] in socialLinks"
        :key="name"
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="name"
      >
        <img
          :src="image"
          :alt="name"
          class="social-icon-img"
          loading="lazy"
        />
      </a>
    </div>

  </div>
</template>

<style scoped>
/* ============================================================
   SOCIAL SECTION
   ============================================================ */

.social-row {
  margin-top: 2.5rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  text-align: center;
}

.social-row h3 {
  margin: 0 0 1.5rem;
  font-family: var(--font-label);
  font-size: var(--text-label-lg);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-label);
}

/* ============================================================
   SOCIAL LINKS
   ============================================================ */

.social-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  background: var(--color-social-bg);
  padding: 1.5rem;
  border-radius: 8px;
}

.social-container a {
  display: inline-flex;
}

.social-icon-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  transition:
    transform 0.3s ease;
}

.social-icon-img:hover {
  transform: scale(1.2);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */

@media (max-width: 575.98px) {
  .social-container {
    gap: 1rem;
  }

  .social-icon-img {
    width: 44px;
    height: 44px;
  }
}
</style>