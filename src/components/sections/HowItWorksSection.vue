<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Database, Cpu, Search, Rocket, Check } from '@lucide/vue'
const { t } = useI18n()
const steps = [
    { key: 'firstColumn', icon: Database, color: 'text-violet-300' },
    { key: 'secondColumn', icon: Cpu, color: 'text-sky-300' },
    { key: 'thirdColumn', icon: Search, color: 'text-pink-300' },
    { key: 'fourthColumn', icon: Rocket, color: 'text-violet-400' },
]

const active = ref(0)
const paused = ref(false)
let timer = 0

// Steps advance on their own until the user hovers or focuses the section; clicking a step jumps to it
const startAuto = () => {
    clearInterval(timer)
    timer = window.setInterval(() => {
        if (!paused.value) active.value = (active.value + 1) % steps.length
    }, 4500)
}

const select = (i: number) => {
    active.value = i
    startAuto() // restart the countdown so the chosen step stays for a full cycle
}

onMounted(() => {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) startAuto()
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30 text-center">
        <h2 v-reveal class="text-[2.5rem] font-bold text-white mb-16">{{ t('howItWorks.title') }}</h2>
        <div
            v-reveal
            @mouseenter="paused = true"
            @mouseleave="paused = false"
            @focusin="paused = true"
            @focusout="paused = false"
        >
            <div class="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                <div class="line-draw hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-white/10">
                    <!-- fills up to the active step -->
                    <div
                        class="h-full bg-linear-to-r from-violet-300 to-sky-300 transition-[width] duration-700 ease-out"
                        :style="{ width: `${(active / (steps.length - 1)) * 100}%` }"
                    ></div>
                </div>
                <button
                    v-for="(s, i) in steps"
                    :key="s.key"
                    type="button"
                    :aria-pressed="active === i"
                    class="step group relative flex flex-col items-center max-w-60 cursor-pointer focus-visible:outline-none"
                    :class="{ 'is-active': active === i, 'is-done': i < active }"
                    @click="select(i)"
                >
                    <div class="orb glass w-24 h-24 rounded-full flex items-center justify-center mb-6">
                        <component :is="s.icon" :class="['w-9 h-9', s.color]" />
                    </div>
                    <h3 class="title text-xl font-semibold text-white mb-2">{{ i + 1 }}. {{ t(`howItWorks.table.${s.key}.title`) }}</h3>
                    <p class="text-sm text-gray-300">{{ t(`howItWorks.table.${s.key}.description`) }}</p>
                </button>
            </div>

            <!-- detail panel for the selected step -->
            <div class="glass rounded-3xl mt-14 mx-auto max-w-2xl p-6 text-left min-h-44">
                <Transition name="panel" mode="out-in">
                    <div :key="active">
                        <div class="flex items-center gap-3 mb-4">
                            <component :is="steps[active].icon" :class="['w-5 h-5', steps[active].color]" />
                            <span class="font-semibold text-white">{{ active + 1 }}. {{ t(`howItWorks.table.${steps[active].key}.title`) }}</span>
                        </div>
                        <ul class="space-y-3">
                            <li
                                v-for="(_, p) in 3"
                                :key="p"
                                class="point flex items-start gap-3 text-gray-300"
                                :style="{ '--i': p }"
                            >
                                <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                                    <Check class="w-3 h-3" />
                                </span>
                                {{ t(`howItWorks.table.${steps[active].key}.points[${p}]`) }}
                            </li>
                        </ul>
                    </div>
                </Transition>
                <!-- auto-advance progress -->
                <div class="mt-5 flex gap-1.5">
                    <span
                        v-for="(_, i) in steps"
                        :key="i"
                        class="h-1 flex-1 rounded-full transition-colors duration-500"
                        :class="i <= active ? 'bg-violet-300/70' : 'bg-white/10'"
                    ></span>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.orb {
    /* glass tint over a solid page-colored base, so the connector line is hidden behind the circle */
    background: linear-gradient(rgb(255 255 255 / 0.02), rgb(255 255 255 / 0.02)), #171725;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, border-color 0.4s ease;
}
.step:hover .orb {
    transform: translateY(-4px) scale(1.05);
}
.step:focus-visible .orb {
    border-color: rgb(196 181 253 / 0.8);
}
.step.is-active .orb {
    border-color: rgb(196 181 253 / 0.6);
    box-shadow: 0 0 0 6px rgb(196 181 253 / 0.1), 0 0 40px rgb(167 139 250 / 0.35);
    transform: scale(1.08);
}
.step.is-active .orb svg {
    animation: icon-pulse 2.4s ease-in-out infinite;
}
.step.is-done .orb {
    border-color: rgb(110 231 183 / 0.35);
}
.step .title {
    transition: color 0.3s ease;
}
/* dim only the contents of inactive steps: opacity on the whole button would let the line show through the orb */
.step:not(.is-active):not(.is-done) .orb svg,
.step:not(.is-active):not(.is-done) h3,
.step:not(.is-active):not(.is-done) p {
    opacity: 0.65;
}
.step .orb svg,
.step h3,
.step p {
    transition: opacity 0.3s ease;
}
.step:hover .orb svg,
.step:hover h3,
.step:hover p {
    opacity: 1 !important;
}

.panel-enter-active,
.panel-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}
.panel-enter-from {
    opacity: 0;
    transform: translateY(10px);
}
.panel-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.point {
    animation: point-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards;
    animation-delay: calc(0.1s + var(--i) * 110ms);
}

@keyframes point-in {
    from { opacity: 0; transform: translateX(-12px); }
}
@keyframes icon-pulse {
    50% { transform: scale(1.12); }
}

@media (prefers-reduced-motion: reduce) {
    .step.is-active .orb svg,
    .point { animation: none; }
    .orb, .panel-enter-active, .panel-leave-active { transition: none; }
}
</style>
