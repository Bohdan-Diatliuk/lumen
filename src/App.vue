<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Navbar from './layout/Navbar.vue';
import GlassCircles from './components/ui/GlassCircles.vue';
import bgData from './assets/bg/data.webp';
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
import GlitchPopup from './components/ui/GlitchPopup.vue';

const { t } = useI18n();

const heroImg = ref<HTMLImageElement>();
const heroLoaded = ref(false);

// A cached image can finish loading before Vue mounts, so @load would never fire
onMounted(() => {
  if (heroImg.value?.complete) heroLoaded.value = true;
});
</script>

<template>
  <div id="top" class="overflow-hidden">
    <section class="relative min-h-screen">
      <div class="absolute inset-0 -z-10 bg-[#0a0f1f]"
        style="background-image: radial-gradient(60% 50% at 0% 100%, rgb(124 92 255 / 0.35), transparent), radial-gradient(60% 50% at 100% 0%, rgb(56 189 248 / 0.3), transparent)">
        <img ref="heroImg" src="/bg/hero.webp" alt="" fetchpriority="high" decoding="async" @load="heroLoaded = true"
          :class="['size-full object-cover transition-opacity duration-700', heroLoaded ? 'opacity-100' : 'opacity-0']" />
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-64 -z-10"
        style="background: linear-gradient(to bottom, transparent, #171725)"></div>
      <Navbar />
      <GlassCircles />
    </section>
    <section class="relative min-h-screen flex items-center justify-center px-6"
      :style="{ transform: 'perspective(1200px) rotateX(8deg)' }">
      <div class="trace-border w-full max-w-6xl rounded-2xl">
        <img :src="bgData" alt="data" loading="lazy" decoding="async" class="relative z-10 w-full h-auto border-10 border-white/10 opacity-90 rounded-2xl" />
        <span class="trace-side trace-side-left">{{ t('preview.left') }}</span>
        <span class="trace-side trace-side-right">{{ t('preview.right') }}</span>
      </div>
    </section>
    <GlassSearch />
    <DataTeamSection id="product" />
    <CardSection id="features" />
    <LumenAnswerSection id="answer" />
    <ReportsSection />
    <HowItWorksSection />
    <StatsSection />
    <TestimonialsSection id="customers" />
    <PricingSection id="pricing" />
    <FaqSection id="resources" />
    <CtaSection />
    <Footer />
    <GlitchPopup trigger="#answer .click-zone" src="/mascot.webp" />
  </div>
</template>
