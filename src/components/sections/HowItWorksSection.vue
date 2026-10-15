<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Database, Cpu, Search, Rocket } from '@lucide/vue'
const { t } = useI18n()
const steps = [
    { key: 'firstColumn', icon: Database, color: 'text-violet-300' },
    { key: 'secondColumn', icon: Cpu, color: 'text-sky-300' },
    { key: 'thirdColumn', icon: Search, color: 'text-pink-300' },
    { key: 'fourthColumn', icon: Rocket, color: 'text-violet-400' },
]
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30 text-center">
        <h2 class="text-[2.5rem] font-bold text-white mb-16">{{ t('howItWorks.title') }}</h2>
        <div class="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div class="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-white/10"></div>
            <div v-for="(s, i) in steps" :key="s.key" class="relative flex flex-col items-center max-w-60">
                <div class="glass w-24 h-24 rounded-full flex items-center justify-center mb-6">
                    <component :is="s.icon" :class="['w-9 h-9', s.color]" />
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">{{ i + 1 }}. {{ t(`howItWorks.table.${s.key}.title`) }}</h3>
                <p class="text-sm text-gray-300">{{ t(`howItWorks.table.${s.key}.description`) }}</p>
            </div>
        </div>
    </section>
</template>
