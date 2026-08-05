<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import GlassCircles from './components/GlassCircles.vue';
import bgImage from './assets/bg/screen.png';
</script>

<template>
  <div id="app">
    <section class="relative min-h-screen">
      <div class="absolute inset-0 -z-10 bg-cover bg-center" :style="{ backgroundImage: `url(${bgImage})` }">
      </div>
      <Navbar />
      <GlassCircles />
    </section>
  </div>
</template>
