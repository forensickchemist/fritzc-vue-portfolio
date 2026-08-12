<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { toolGroups } from '../../data/portfolio'
</script>

<template>
  <section id="tools" class="section tools-section">
    <div class="container">
      <SectionHeader title="TOOLS" />

      <div class="tool-groups">
        <section v-for="group in toolGroups" :key="group.name" class="tool-group">
          <h3>{{ group.name }}</h3>

          <div class="tool-list">
            <img
              v-for="[name, src] in group.tools"
              :key="`${group.name}-${name}`"
              :src="src"
              :alt="name"
              :title="name"
              class="tool-logo"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tools-section {
  padding-block: clamp(4rem, 8vw, 5rem);
  background: var(--color-bg);
}

.tool-groups {
  display: grid;
  gap: 2.75rem;
}

.tool-group {
  text-align: center;
}

.tool-group h3 {
  margin: 0 0 1rem;
  font-family: var(--font-label);
  font-size: var(--text-label-lg);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-label);
}

.tool-list {
  max-width: 720px;
  margin-inline: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  background: var(--color-social-bg);
  padding: 1.5rem;
  border-radius: 8px;
}

.tool-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.tool-logo:hover {
  transform: scale(1.1);
}

@media (max-width: 575.98px) {
  .tool-list {
    gap: 1rem;
  }

  .tool-logo {
    width: 52px;
    height: 52px;
  }
}
</style>
