<template>
  <div class="map-card">
    <iframe
      src="https://maps.google.com/maps?q=Quezon%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
      class="map-frame"
      title="Map of Quezon City"
      allowfullscreen
      loading="lazy"
    ></iframe>
  </div>
</template>

<style scoped>
/* ============================================================
   MAP CARD
   ============================================================ */

.map-card {
  min-height: 540px;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow:
    0 0.125rem 0.5rem
    rgba(0, 0, 0, 0.08);
}

.map-frame {
  width: 100%;
  height: 100%;
  min-height: 540px;
  border: 0;
  display: block;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */

@media (max-width: 991.98px) {
  .map-card,
  .map-frame {
    min-height: 420px;
  }
}
</style>