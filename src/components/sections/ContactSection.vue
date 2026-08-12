<script setup>
import ContactForm from './contact/ContactForm.vue';
import ContactMap from './contact/ContactMap.vue';
import ContactSocials from './contact/ContactSocials.vue';
</script>

<template>
  <section
    id="contact"
    class="section contact-section"
  >
    <div class="container">

      <!-- ==================================================
           SECTION HEADER
           ================================================== -->

      <header class="contact-header">
        <h2>
          LET'S
          <span class="highlight-word">
            BUILD
          </span>
          SOMETHING
          <span class="highlight-word">
            GREAT
          </span>
        </h2>

        <p>
          Have a project in mind?
          Send a message and let's connect.
        </p>
      </header>

      <!-- ==================================================
           CONTACT CONTENT
           ================================================== -->

      <div class="contact-grid">

        <ContactMap />

        <ContactForm />

      </div>

      <!-- ==================================================
           SOCIAL LINKS
           ================================================== -->

      <ContactSocials />

    </div>
  </section>
</template>

<style scoped>
/* ============================================================
   CONTACT SECTION
   ============================================================ */

.contact-section {
  padding-block: clamp(4rem, 8vw, 5rem);
  background: var(--color-bg);
}

/* ============================================================
   SECTION HEADER
   ============================================================ */

.contact-header {
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

.contact-header h2 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: var(--text-heading-xl);
  font-weight: 700;
  letter-spacing: -0.018em;
  color: var(--color-text-h);
}

.contact-header p {
  margin: 0.4rem 0 0;
  font-family: var(--font-body);
  font-size: var(--text-body-md);
  color: var(--color-text-muted);
}

/* ============================================================
   CONTACT GRID
   ============================================================ */

.contact-grid {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */

@media (max-width: 991.98px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>