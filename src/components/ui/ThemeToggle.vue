<script setup>
import { useTheme } from '../../composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="isDark"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <i
      class="bi"
      :class="isDark ? 'bi-sun-fill' : 'bi-moon-fill'"
      aria-hidden="true"
    ></i>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 0.5rem;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: transparent;
  color: var(--color-text-body);
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.theme-toggle:hover {
  color: var(--color-gold-bg);
  border-color: var(--color-gold-bg);
  background: var(--color-gold-bg);
  transform: translateY(-1px);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--color-teal);
  outline-offset: 2px;
}

.theme-toggle .bi {
  font-size: 1rem;
}

@media (max-width: 991.98px) {
  .theme-toggle {
    margin-left: 0;
    margin-right: 0.75rem;
  }
}
</style>