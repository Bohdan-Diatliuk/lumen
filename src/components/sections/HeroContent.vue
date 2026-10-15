<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 gap-8">
        <div class="glass rounded-full px-4 py-1.5 text-sm text-white/70">🚀 {{ t('hero.badge') }}</div>
        <h1 class="max-w-5xl text-5xl md:text-[88px] md:leading-24 font-bold tracking-tight text-white">
            {{ t('main.title') }}
        </h1>
        <p class="max-w-3xl text-xl text-white/70">{{ t('main.description') }}</p>
        <div class="flex flex-col sm:flex-row gap-4">
            <button
                class="px-8 py-3.5 rounded-full font-semibold text-[#171725] bg-linear-to-r from-violet-300 to-sky-300 shadow-[0_0_24px_rgba(202,190,255,0.4)] hover:scale-105 transition-transform">
                {{ t('hero.cta') }}
            </button>
            <button class="glass px-8 py-3.5 rounded-full font-medium hover:bg-white/10 transition-colors">
                {{ t('hero.demo') }}
            </button>
        </div>
        <p class="text-sm text-white/50">{{ t('hero.note') }}</p>
    </div>
</template>
