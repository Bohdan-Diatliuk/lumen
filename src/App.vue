<script setup lang="ts">
import Navbar from './layout/Navbar.vue';
import GlassCircles from './components/ui/GlassCircles.vue';
import bgImage from './assets/bg/screen.png';
import bgData from './assets/bg/data.png';
</script>

<template>
  <div class="overflow-hidden">
    <section class="relative min-h-screen">
      <div class="absolute inset-0 -z-10 bg-cover bg-center" :style="{ backgroundImage: `url(${bgImage})` }">
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-64 -z-10"
        style="background: linear-gradient(to bottom, transparent, #171725)"></div>
      <Navbar />
      <GlassCircles />
    </section>
    <section class="relative min-h-screen flex items-center justify-center px-6"
      :style="{ transform: 'perspective(1200px) rotateX(8deg)' }">
      <img :src="bgData" alt="data" class="w-full max-w-6xl h-auto border-10 border-white/10 opacity-90 rounded-2xl" />
    </section>
    <section class="flex justify-center mb-2">
        <h1 class="text-2xl">Hello zed</h1>
    </section>
  </div>
</template>
