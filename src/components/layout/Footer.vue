<script setup>
import { navigation } from '../../data/portfolio'

const services = ['Web Development', 'Business Analytics', 'Social Media Management']
</script>

<template>
  <footer id="footer" class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="/images/brand/lowerwhite.png" alt="While Bored Logo" class="footer-logo" />
          <div class="brand-tagline">
            <span>Boredom sparked it.</span>
            <span>Purpose built it.</span>
          </div>
        </div>

        <div>
          <h2 class="footer-title">Quick Links</h2>
          <ul class="footer-links">
            <li v-for="[label, href] in navigation" :key="href">
              <a :href="href">{{ label.replace('MY ', '').toLowerCase().replace(/^\w/, c => c.toUpperCase()) }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="footer-title">Services</h2>
          <ul class="footer-links">
            <li v-for="service in services" :key="service">{{ service }}</li>
          </ul>
        </div>
      </div>

      <div class="copyright">© 2026 Fritz C. All Rights Reserved.</div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-navbar);
  color: var(--color-text-h);
  padding: 3.75rem 0 1.875rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2.5rem;
  justify-items: center;
  text-align: center;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.brand-tagline {
  display: flex;
  flex-direction: column;
  font-family: var(--font-label);
  font-size: var(--text-body-xs);
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.footer-title {
  margin: 0 0 0.9375rem;
  font-family: var(--font-label);
  font-size: var(--text-label-lg);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: rgba(255, 255, 255, 0.65);
}

.footer-links a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease, padding-left 0.2s ease;
}

.footer-links a:hover {
  color: #fff;
  padding-left: 5px;
}

.copyright {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
  font-family: var(--font-body);
  font-size: var(--text-body-xs);
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 767.98px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
