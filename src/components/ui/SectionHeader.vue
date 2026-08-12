<script setup>
defineProps({
  title: { type: String, required: true },
  label: { type: String, default: '' },
  description: { type: String, default: '' },
})
</script>

<template>
  <header class="section-header">
    <p v-if="label" class="section-label">{{ label }}</p>
    <h2>{{ title }}</h2>
    <p v-if="description" class="section-description">{{ description }}</p>
  </header>
</template>