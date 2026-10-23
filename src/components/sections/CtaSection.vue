<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Activity, AlertTriangle, Check, Clock, Database, Loader2, Send, Share2, ShieldCheck, TrendingDown, TrendingUp } from '@lucide/vue'
const { t } = useI18n()

const avatars = import.meta.glob<string>('../../assets/avatars/*.webp', { eager: true, import: 'default' })
const stack = [1, 2, 3, 4].map((n) => avatars[`../../assets/avatars/user${n}.webp`])

// Floating data chips around the card (wide screens only)
const chips = [
    { key: 'a', icon: TrendingUp, color: 'text-emerald-300', pos: '-left-28 top-14', delay: '0s', dur: '6s' },
    { key: 'b', icon: AlertTriangle, color: 'text-amber-300', pos: '-right-28 top-28', delay: '-2s', dur: '7s' },
    { key: 'c', icon: Send, color: 'text-sky-300', pos: '-left-20 bottom-16', delay: '-4s', dur: '6.5s' },
    { key: 'd', icon: Clock, color: 'text-violet-300', pos: '-right-20 bottom-10', delay: '-1s', dur: '5.5s' },
    { key: 'e', icon: TrendingDown, color: 'text-emerald-300', pos: '-left-24 top-1/2', delay: '-3s', dur: '7.5s' },
    { key: 'f', icon: Share2, color: 'text-pink-300', pos: '-right-24 top-1/2', delay: '-5s', dur: '6s' },
    { key: 'g', icon: Database, color: 'text-sky-300', pos: '-top-5 left-24', delay: '-2.5s', dur: '8s' },
    { key: 'h', icon: ShieldCheck, color: 'text-violet-300', pos: '-bottom-5 right-32', delay: '-6s', dur: '7s' },
]

const email = ref('')
const state = ref<'idle' | 'loading' | 'success'>('idle')
const error = ref(false)
const shake = ref(0) // bumping the key restarts the shake animation
let timer = 0

const submit = () => {
    if (state.value !== 'idle') return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        error.value = true
        shake.value++
        return
    }
    error.value = false
    state.value = 'loading'
    // no backend yet: fake the round trip, then reset so the demo can be replayed
    timer = window.setTimeout(() => {
        state.value = 'success'
        timer = window.setTimeout(() => {
            state.value = 'idle'
            email.value = ''
        }, 5000)
    }, 1200)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
    <section class="px-6 md:px-16 py-30 pb-32">
        <div v-reveal class="relative max-w-4xl mx-auto">
            <!-- floating chips, outside the card so its overflow can stay hidden -->
            <div
                v-for="c in chips"
                :key="c.key"
                :class="['chip glass absolute z-10 hidden xl:flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-gray-200 whitespace-nowrap', c.pos]"
                :style="{ animationDelay: c.delay, animationDuration: c.dur }"
            >
                <component :is="c.icon" :class="['w-4 h-4', c.color]" /> {{ t(`cta.chips.${c.key}`) }}
            </div>

            <div class="card glass relative rounded-[40px] p-12 md:p-20 text-center overflow-hidden">
                <!-- aurora + dot grid -->
                <div class="absolute inset-0 bg-linear-to-b from-violet-300/10 to-transparent pointer-events-none"></div>
                <div class="aurora a1 absolute -top-24 -left-16 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl pointer-events-none"></div>
                <div class="aurora a2 absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-sky-400/25 blur-3xl pointer-events-none"></div>
                <div class="dots absolute inset-0 pointer-events-none"></div>

                <div class="relative">
                    <!-- social proof -->
                    <div class="mb-8 inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 py-1.5 pl-1.5 pr-4 text-xs text-white/70">
                        <span class="flex -space-x-2">
                            <img v-for="(src, i) in stack" :key="i" :src="src" alt="" width="24" height="24" class="h-6 w-6 rounded-full object-cover ring-2 ring-[#1b1b2b]" />
                        </span>
                        <span class="flex items-center gap-1.5"><Activity class="w-3.5 h-3.5 text-emerald-300" /> {{ t('cta.joined') }}</span>
                    </div>

                    <h2 class="title text-5xl md:text-6xl font-bold mb-6 tracking-tight">{{ t('cta.title') }}</h2>
                    <p class="text-lg text-gray-300 mb-10 max-w-xl mx-auto">{{ t('cta.subTitle') }}</p>

                    <!-- form -->
                    <Transition name="swap" mode="out-in">
                        <form v-if="state !== 'success'" key="form" class="max-w-lg mx-auto" novalidate @submit.prevent="submit">
                            <div class="flex flex-col sm:flex-row gap-4">
                                <input
                                    :key="shake"
                                    v-model="email"
                                    type="email"
                                    :placeholder="t('cta.placeholder')"
                                    :aria-invalid="error"
                                    :disabled="state === 'loading'"
                                    :class="['field w-full px-6 py-4 rounded-full bg-black/20 border text-white placeholder:text-white/50 focus:outline-none', error ? 'is-error border-rose-400/70' : 'border-white/20 focus:border-violet-300']"
                                    @input="error = false"
                                />
                                <button
                                    :disabled="state === 'loading'"
                                    class="cta-btn relative flex min-w-48 items-center justify-center overflow-hidden rounded-full px-8 py-4 font-bold whitespace-nowrap text-[#171725] bg-linear-to-r from-violet-300 to-sky-300 shadow-[0_0_24px_rgba(202,190,255,0.4)] hover:scale-105 transition-transform disabled:hover:scale-100"
                                >
                                    <Loader2 v-if="state === 'loading'" class="w-5 h-5 animate-spin" />
                                    <template v-else>{{ t('cta.button') }}</template>
                                </button>
                            </div>
                            <p class="mt-3 h-5 text-sm text-rose-300">
                                <Transition name="swap"><span v-if="error">{{ t('cta.error') }}</span></Transition>
                            </p>
                        </form>

                        <div v-else key="ok" class="mx-auto flex max-w-lg items-center justify-center gap-4 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-6 py-4 text-emerald-200">
                            <span class="ok-tick flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-300 text-[#0b2a1d]"><Check class="w-5 h-5" /></span>
                            <span class="text-left text-sm font-medium">{{ t('cta.success') }}</span>
                        </div>
                    </Transition>

                    <p class="text-sm text-white/50 mt-4">{{ t('cta.note') }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.title {
    background: linear-gradient(100deg, #fff 20%, #c4b5fd 45%, #7dd3fc 55%, #fff 80%);
    background-size: 220% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: sheen 7s ease-in-out infinite;
}
@keyframes sheen {
    0%, 100% { background-position: 100% 0; }
    50% { background-position: 0 0; }
}

.aurora {
    animation: drift 12s ease-in-out infinite;
}
.a2 {
    animation-duration: 16s;
    animation-direction: reverse;
}
@keyframes drift {
    50% { transform: translate(60px, 30px) scale(1.15); }
}

.dots {
    background-image: radial-gradient(rgb(255 255 255 / 0.12) 1px, transparent 1px);
    background-size: 22px 22px;
    mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
}

.chip {
    animation: chip-float 6s ease-in-out infinite;
}
@keyframes chip-float {
    50% { transform: translateY(-12px); }
}

/* button shine sweep */
.cta-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 35%, rgb(255 255 255 / 0.55) 50%, transparent 65%);
    transform: translateX(-120%);
}
.cta-btn:hover:not(:disabled)::after {
    transition: transform 0.8s ease;
    transform: translateX(120%);
}

.field {
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.field:focus {
    box-shadow: 0 0 0 4px rgb(196 181 253 / 0.12);
}
.field.is-error {
    animation: shake 0.4s ease;
}
@keyframes shake {
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
}

.ok-tick {
    animation: tick-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s backwards;
}
@keyframes tick-pop {
    from { transform: scale(0) rotate(-30deg); }
}

.swap-enter-active,
.swap-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}
.swap-enter-from {
    opacity: 0;
    transform: translateY(8px);
}
.swap-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
    .title { animation: none; background-position: 50% 0; }
    .aurora, .chip, .field.is-error, .ok-tick { animation: none; }
    .field, .swap-enter-active, .swap-leave-active, .cta-btn::after { transition: none; }
}
</style>
