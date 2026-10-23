<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Check } from '@lucide/vue'
const { t } = useI18n()
const plans = [
    { key: 'startCard', items: 4, popular: false, btn: 'start' },
    { key: 'proCard', items: 5, popular: true, btn: 'start' },
    { key: 'customCard', items: 5, popular: false, btn: 'contact' },
]
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30">
        <div v-reveal class="text-center mb-16">
            <h2 class="text-[2.5rem] font-bold text-white mb-4">{{ t('price.title') }}</h2>
            <p class="text-lg text-gray-300">{{ t('price.subTitle') }}</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 items-center">
            <div v-for="(p, i) in plans" :key="p.key" v-reveal="i * 120"
                :class="['glass relative rounded-3xl p-8', p.popular && 'md:scale-105 border-violet-300/50 bg-white/10 shadow-[0_0_40px_rgba(202,190,255,0.15)]']">
                <div v-if="p.popular"
                    class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-wider text-[#171725] bg-linear-to-r from-violet-300 to-sky-300">
                    {{ t('pricingExtra.popular') }}
                </div>
                <h3 class="text-2xl font-semibold text-white mb-2">{{ t(`price.${p.key}.title`) }}</h3>
                <div class="mb-6">
                    <span class="text-4xl font-bold text-white">{{ t(`price.${p.key}.price`) }}</span>
                    <span v-if="t(`price.${p.key}.month`)" class="text-gray-300">/{{ t(`price.${p.key}.month`) }}</span>
                </div>
                <p class="text-gray-300 mb-8 min-h-12">{{ t(`price.${p.key}.description`) }}</p>
                <button
                    :class="['w-full py-3 rounded-full font-bold mb-8 transition-colors', p.popular ? 'bg-violet-300 text-[#31009a] hover:bg-violet-200' : 'border border-white/20 bg-white/5 hover:bg-white/10']">
                    {{ t(`pricingExtra.${p.btn}`) }}
                </button>
                <ul class="space-y-4">
                    <li v-for="n in p.items" :key="n" class="flex items-center gap-3 text-gray-300">
                        <Check class="w-4 h-4 text-violet-300 shrink-0" /> {{ t(`price.${p.key}.list.item${n}`) }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
