<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ArrowRight } from '@lucide/vue'
const { t } = useI18n()
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30">
        <div class="grid md:grid-cols-2 gap-16 items-center">
            <div class="glass rounded-3xl p-6 space-y-4 shadow-2xl order-2 md:order-1">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-linear-to-br from-violet-300 to-sky-300"></div>
                    <div>
                        <div class="text-sm font-semibold text-white">Lumen <span class="text-xs font-normal text-white/40">9:00 AM</span></div>
                        <div class="text-xs text-white/50">#weekly-metrics</div>
                    </div>
                </div>
                <div class="rounded-xl bg-white/5 p-4 space-y-2 text-sm text-gray-300">
                    <div class="font-semibold text-white">{{ t('mock.report') }}</div>
                    <div class="h-2 w-full rounded bg-white/10"></div>
                    <div class="h-2 w-5/6 rounded bg-white/10"></div>
                    <div class="h-2 w-2/3 rounded bg-white/10"></div>
                </div>
            </div>
            <div class="space-y-6 order-1 md:order-2">
                <h2 class="text-[2.5rem] font-bold text-white leading-tight">{{ t('reports.title') }}</h2>
                <p class="text-lg text-gray-300">{{ t('reports.description') }}</p>
                <p class="text-lg text-gray-300">{{ t('reports.text') }}</p>
                <button class="flex items-center gap-2 font-bold text-violet-300 hover:gap-3 transition-all">
                    {{ t('reports.btn') }} <ArrowRight class="w-4 h-4" />
                </button>
            </div>
        </div>
    </section>
</template>
