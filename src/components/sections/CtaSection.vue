<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
    <section class="px-6 md:px-16 py-30 pb-32">
        <div class="glass relative max-w-4xl mx-auto rounded-[40px] p-12 md:p-20 text-center overflow-hidden">
            <div class="absolute inset-0 bg-linear-to-b from-violet-300/10 to-transparent pointer-events-none"></div>
            <div class="relative">
                <h2 class="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">{{ t('cta.title') }}</h2>
                <p class="text-lg text-gray-300 mb-10 max-w-xl mx-auto">{{ t('cta.subTitle') }}</p>
                <form class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" @submit.prevent>
                    <input type="email" :placeholder="t('cta.placeholder')"
                        class="w-full px-6 py-4 rounded-full bg-black/20 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-violet-300" />
                    <button
                        class="px-8 py-4 rounded-full font-bold whitespace-nowrap text-[#171725] bg-linear-to-r from-violet-300 to-sky-300 shadow-[0_0_24px_rgba(202,190,255,0.4)] hover:scale-105 transition-transform">
                        {{ t('cta.button') }}
                    </button>
                </form>
                <p class="text-sm text-white/50 mt-6">{{ t('cta.note') }}</p>
            </div>
        </div>
    </section>
</template>
