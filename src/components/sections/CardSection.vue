<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { MessageSquare, FileText, Activity, Cable, RefreshCw, ShieldCheck } from '@lucide/vue'

const { t } = useI18n()

const cards = [
    { key: 'language', icon: MessageSquare, color: 'text-violet-300 bg-violet-300/20' },
    { key: 'reports', icon: FileText, color: 'text-sky-300 bg-sky-300/20' },
    { key: 'anomaly', icon: Activity, color: 'text-pink-400 bg-pink-400/20' },
    { key: 'integrations', icon: Cable, color: 'text-violet-300 bg-violet-300/20' },
    { key: 'sync', icon: RefreshCw, color: 'text-sky-300 bg-sky-300/20' },
    { key: 'security', icon: ShieldCheck, color: 'text-pink-400 bg-pink-400/20' },
]
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30">
        <div class="text-center mb-16">
            <h2 class="text-[2.5rem] font-bold text-white mb-4">{{ t('cards.title') }}</h2>
            <p class="text-lg text-gray-300 max-w-2xl mx-auto">{{ t('cards.subTitle') }}</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
            <div v-for="c in cards" :key="c.key"
                class="glass group rounded-3xl p-8 hover:bg-white/10 transition-colors">
                <div :class="['w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform', c.color]">
                    <component :is="c.icon" class="w-6 h-6" />
                </div>
                <h3 class="text-2xl font-semibold text-white mb-3">{{ t(`cards.${c.key}.title`) }}</h3>
                <p class="text-gray-300">{{ t(`cards.${c.key}.description`) }}</p>
            </div>
        </div>
    </section>
</template>
