<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const stats = [
    { value: '12k+', key: 'teams', color: 'text-violet-300' },
    { value: '40M', key: 'answer', color: 'text-sky-300' },
    { value: '6.5h', key: 'save', color: 'text-pink-400' },
    { value: '99.9%', key: 'sla', color: 'text-white' },
]
</script>

<template>
    <section class="py-12 px-6 md:px-16">
        <div class="glass max-w-300 mx-auto rounded-[40px] p-12">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:divide-x divide-white/10">
                <div v-for="s in stats" :key="s.key">
                    <div :class="['text-4xl md:text-5xl font-bold mb-2', s.color]">{{ s.value }}</div>
                    <div class="text-xs font-semibold uppercase tracking-widest text-white/60">{{ t(`data.${s.key}`) }}</div>
                </div>
            </div>
        </div>
    </section>
</template>
