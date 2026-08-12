<script setup>
import { ref } from 'vue'
import { navigation } from '../../data/portfolio'
import ThemeToggle from '../ui/ThemeToggle.vue'

const isOpen = ref(false)

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <nav class="site-navbar">
    <div class="container-fluid navbar-inner">
      <a
        class="brand"
        href="#landing"
        aria-label="Home"
        @click="closeMenu"
      >
        <img
          src="/images/brand/lowerwhite.png"
          alt="Fritzc logo"
          class="brand-logo"
        />
      </a>

      <div
        id="site-navigation"
        class="navbar-menu"
        :class="{ 'is-open': isOpen }"
      >
        <ul>
          <li v-for="[label, href] in navigation" :key="href">
            <a :href="href" @click="closeMenu">
              {{ label }}
            </a>
          </li>
        </ul>
      </div>

      <div class="navbar-actions">
        <ThemeToggle />

        <button
          class="navbar-toggle"
          type="button"
          :aria-expanded="isOpen"
          aria-controls="site-navigation"
          aria-label="Toggle navigation"
          @click="isOpen = !isOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.site-navbar {
  background: var(--color-navbar);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-inner {
  min-height: 76px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  flex-direction: column;
  margin-left: clamp(0.75rem, 4vw, 3rem);
  flex-shrink: 0;
}

.brand-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

/* ============================================================
   DESKTOP NAVIGATION
   ============================================================ */

.navbar-menu {
  margin-left: auto;
}

.navbar-menu ul {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar-menu a {
  display: block;
  padding: 0.5rem 0.7rem;
  color: rgba(255, 255, 255, 0.75);
  font-family: var(--font-body);
  font-size: var(--text-ui-md);
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: color 0.2s ease;
}

.navbar-menu a:hover,
.navbar-menu a:focus-visible {
  color: var(--color-gold-bg);
}

/* ============================================================
   NAVBAR ACTIONS
   ============================================================ */

.navbar-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-right: clamp(1rem, 4vw, 3rem);
}

/* ============================================================
   MOBILE TOGGLE
   ============================================================ */

.navbar-toggle {
  display: none;
  width: 44px;
  height: 40px;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 0.375rem;
  background: transparent;
  cursor: pointer;
}

.navbar-toggle span {
  display: block;
  height: 2px;
  margin: 4px 0;
  background: #fff;
}

.navbar-toggle:focus-visible {
  outline: 2px solid var(--color-teal);
  outline-offset: 2px;
}

/* ============================================================
   TABLET / MOBILE
   ============================================================ */

@media (max-width: 991.98px) {
  .navbar-inner {
    flex-wrap: wrap;
    padding: 0.5rem 0;
  }

  .navbar-menu {
    display: none;
    flex-basis: 100%;
    width: 100%;
    padding: 0.5rem 1rem 1rem;
    order: 3;
  }

  .navbar-menu.is-open {
    display: block;
  }

  .navbar-menu ul {
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
  }

  .navbar-menu a {
    width: 100%;
    padding: 0.75rem 0.5rem;
  }

  .navbar-actions {
    margin-left: auto;
    padding-right: 1rem;
  }

  .navbar-toggle {
    display: block;
  }
}
</style>