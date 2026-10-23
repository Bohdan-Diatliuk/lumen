<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ChevronDown } from '@lucide/vue'
const { t, tm } = useI18n()
const items = () => tm('faq.items') as { q: string; a: string }[]
</script>

<template>
    <section class="max-w-3xl mx-auto px-6 md:px-16 py-30">
        <h2 v-reveal class="text-[2.5rem] font-bold text-white text-center mb-12">{{ t('faq.title') }}</h2>
        <div class="space-y-4">
            <details v-for="(item, i) in items()" :key="i" v-reveal="i * 80" class="glass group rounded-2xl">
                <summary class="flex items-center justify-between p-6 text-lg font-semibold text-white cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    {{ item.q }}
                    <ChevronDown class="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div class="px-6 pb-6 text-gray-300">{{ item.a }}</div>
            </details>
        </div>
    </section>
</template>
