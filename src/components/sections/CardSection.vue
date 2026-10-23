<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { MessageSquare, FileText, Activity, Cable, RefreshCw, ShieldCheck, Check, RotateCw, Quote } from '@lucide/vue'

const { t } = useI18n()

const cards = [
    { key: 'language', icon: MessageSquare, color: 'text-violet-300 bg-violet-300/20' },
    { key: 'reports', icon: FileText, color: 'text-sky-300 bg-sky-300/20' },
    { key: 'anomaly', icon: Activity, color: 'text-pink-400 bg-pink-400/20' },
    { key: 'integrations', icon: Cable, color: 'text-violet-300 bg-violet-300/20' },
    { key: 'sync', icon: RefreshCw, color: 'text-sky-300 bg-sky-300/20' },
    { key: 'security', icon: ShieldCheck, color: 'text-pink-400 bg-pink-400/20' },
]

// The track holds two identical sets so the loop is seamless; the copy is hidden from screen readers
const sets = [false, true]

// Keyed by card, so both copies of a card flip together and the state survives the loop
const flipped = reactive(new Set<string>())
const toggle = (key: string) => {
    if (flipped.has(key)) flipped.delete(key)
    else flipped.add(key)
}
</script>

<template>
    <section class="py-30">
        <div v-reveal class="text-center mb-16 max-w-300 mx-auto px-6 md:px-16">
            <h2 class="text-[2.5rem] font-bold text-white mb-4">{{ t('cards.title') }}</h2>
            <p class="text-lg text-gray-300 max-w-2xl mx-auto">{{ t('cards.subTitle') }}</p>
        </div>
        <!-- paused while any card is flipped, so it doesn't drift away mid-read (hover pause doesn't exist on touch) -->
        <div v-reveal="150" :class="['marquee', { 'is-paused': flipped.size > 0 }]">
            <div class="marquee-track">
                <div v-for="hidden in sets" :key="String(hidden)" :aria-hidden="hidden" class="marquee-set">
                    <div v-for="c in cards" :key="c.key" role="button" :tabindex="hidden ? -1 : 0"
                        :aria-pressed="flipped.has(c.key)"
                        :class="['card-flip group w-[22rem] shrink-0 hover:-translate-y-1 transition-[translate] duration-300', { 'is-flipped': flipped.has(c.key) }]"
                        @click="toggle(c.key)" @keydown.enter.prevent="toggle(c.key)" @keydown.space.prevent="toggle(c.key)">
                        <div class="card-flip-inner">
                            <article class="card-face flex flex-col rounded-3xl border border-white/7 bg-[#1b1b2c] p-8 shadow-[2px_8px_32px_0_rgba(0,0,0,0.3)] transition-colors group-hover:bg-[#222236]">
                                <div class="flex items-center justify-between mb-6">
                                    <div :class="['w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform', c.color]">
                                        <component :is="c.icon" class="w-6 h-6" />
                                    </div>
                                    <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/60">
                                        {{ t(`cards.${c.key}.tag`) }}
                                    </span>
                                </div>
                                <h3 class="text-2xl font-semibold text-white mb-3">{{ t(`cards.${c.key}.title`) }}</h3>
                                <p class="text-gray-300 mb-6">{{ t(`cards.${c.key}.description`) }}</p>
                                <ul class="space-y-3 border-t border-white/10 pt-6">
                                    <li v-for="n in 3" :key="n" class="flex items-start gap-3 text-sm text-gray-300">
                                        <Check class="w-4 h-4 mt-0.5 shrink-0 text-violet-300" />
                                        {{ t(`cards.${c.key}.p${n}`) }}
                                    </li>
                                </ul>
                                <div class="mt-auto pt-6 flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-widest text-violet-300">
                                    {{ t('cards.learnMore') }} <RotateCw class="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180" />
                                </div>
                            </article>
                            <article class="card-face card-back flex flex-col rounded-3xl border border-violet-300/30 bg-linear-to-br from-[#2a2548] to-[#1b2a3d] p-8 shadow-[0_0_40px_rgba(202,190,255,0.12)]">
                                <div class="flex items-center gap-3 mb-6">
                                    <div :class="['w-10 h-10 rounded-full flex items-center justify-center', c.color]">
                                        <component :is="c.icon" class="w-5 h-5" />
                                    </div>
                                    <h3 class="text-xl font-semibold text-white">{{ t(`cards.${c.key}.title`) }}</h3>
                                </div>
                                <p class="text-gray-200 mb-6">{{ t(`cards.${c.key}.more`) }}</p>
                                <div class="rounded-2xl border border-white/10 bg-black/20 p-4">
                                    <div class="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-widest text-sky-300">
                                        <Quote class="w-3.5 h-3.5" /> {{ t('cards.exampleLabel') }}
                                    </div>
                                    <p class="text-sm italic text-white">{{ t(`cards.${c.key}.example`) }}</p>
                                </div>
                                <div class="mt-auto pt-6 flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-widest text-violet-300">
                                    {{ t('cards.back') }} <RotateCw class="w-3.5 h-3.5 -scale-x-100" />
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
