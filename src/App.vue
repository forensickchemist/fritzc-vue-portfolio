<script setup>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import LandingSection from './components/sections/LandingSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import ToolsSection from './components/sections/ToolsSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
</script>

<template>
  <Navbar />

  <main>
    <LandingSection />
    <ProjectsSection />
    <ToolsSection />
    <AboutSection />
    <ContactSection />
  </main>

  <Footer />
</template>
