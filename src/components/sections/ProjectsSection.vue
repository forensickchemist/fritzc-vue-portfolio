<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { projects } from '../../data/portfolio'
</script>

<template>
  <section id="projects" class="section projects-section">
    <div class="container">
      <SectionHeader title="MY PROJECTS" label="Selected Work" />

      <div class="projects-grid">
        <article
          v-for="project in projects"
          :key="project.title"
          class="project-card"
        >
          <!-- Project visual -->
          <div class="project-image">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="project.title"
              class="project-image-content"
              loading="lazy"
            />

            <i
              v-else
              :class="['bi', project.icon, 'project-placeholder-icon']"
              aria-hidden="true"
            ></i>
          </div>

          <!-- Project information -->
          <div class="project-body">
            <h3>{{ project.title }}</h3>

            <!-- Technology tags -->
            <div
              v-if="project.technologies?.length"
              class="project-technologies"
              aria-label="Technologies used"
            >
              <span
                v-for="technology in project.technologies"
                :key="technology"
                class="technology-pill"
              >
                {{ technology }}
              </span>
            </div>

            <p>{{ project.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ============================================================
   PROJECTS SECTION
   ============================================================ */

.projects-section {
  padding-block: clamp(4rem, 8vw, 5rem);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

/* ============================================================
   PROJECT CARD
   ============================================================ */

.project-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: var(--color-surface);
  border: 0.5px solid var(--color-border);
  border-radius: 12px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 2px 20px var(--color-highlight);
}

/* ============================================================
   PROJECT VISUAL
   ============================================================ */

.project-image {
  width: 100%;
  height: 220px;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--color-social-bg);
}

.project-image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-placeholder-icon {
  font-size: 4rem;
  color: var(--color-text-label);
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}

.project-card:hover .project-placeholder-icon {
  transform: scale(1.08);
  color: var(--color-teal);
}

/* ============================================================
   PROJECT CONTENT
   ============================================================ */

.project-body {
  flex: 1;
  padding: 1.25rem;
}

.project-body h3 {
  margin: 0 0 0.65rem;
  font-family: var(--font-heading);
  font-size: var(--text-heading-sm);
  font-weight: 700;
  letter-spacing: -0.005em;
  color: var(--color-text-h);
}

/* ============================================================
   TECHNOLOGY PILLS
   ============================================================ */

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.technology-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--color-deep-teal);
  border-radius: 999px;
  background: var(--color-soft-teal);
  color: var(--color-text-label);
  font-family: var(--font-label);
  font-size: var(--text-body-xs);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.03em;
}

.project-body p {
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* ============================================================
   TABLET
   ============================================================ */

@media (max-width: 991.98px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* ============================================================
   MOBILE
   ============================================================ */

@media (max-width: 575.98px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-image {
    height: 210px;
  }

  .project-placeholder-icon {
    font-size: 3.5rem;
  }
}
</style>