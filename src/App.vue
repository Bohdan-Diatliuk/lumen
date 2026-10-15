<script setup lang="ts">
import Navbar from './layout/Navbar.vue';
import GlassCircles from './components/ui/GlassCircles.vue';
import bgImage from './assets/bg/screen.png';
import bgData from './assets/bg/data.png';
import GlassSearch from './components/ui/GlassSearch.vue';
import DataTeamSection from './components/sections/DataTeamSection.vue';
import CardSection from './components/sections/CardSection.vue';
import LumenAnswerSection from './components/sections/LumenAnswerSection.vue';
import ReportsSection from './components/sections/ReportsSection.vue';
import HowItWorksSection from './components/sections/HowItWorksSection.vue';
import StatsSection from './components/sections/StatsSection.vue';
import TestimonialsSection from './components/sections/TestimonialsSection.vue';
import PricingSection from './components/sections/PricingSection.vue';
import FaqSection from './components/sections/FaqSection.vue';
import CtaSection from './components/sections/CtaSection.vue';
import Footer from './layout/Footer.vue';
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
    <GlassSearch />
    <DataTeamSection id="product" />
    <CardSection id="features" />
    <LumenAnswerSection />
    <ReportsSection />
    <HowItWorksSection />
    <StatsSection />
    <TestimonialsSection id="customers" />
    <PricingSection id="pricing" />
    <FaqSection id="resources" />
    <CtaSection />
    <Footer />
  </div>
</template>
