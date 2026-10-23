<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight, CalendarClock, CheckCheck, Clock, Mail, MessageSquare, PenLine, Send } from '@lucide/vue'
import KpiTile from '../ui/KpiTile.vue'
import ReactionPill from '../ui/ReactionPill.vue'
import TypingDots from '../ui/TypingDots.vue'

const { t } = useI18n()

const kpis = computed(() => [
    { label: t('reports.revenue'), value: '248k', delta: '12%', up: true, good: true },
    { label: t('reports.users'), value: '18.4k', delta: '8%', up: true, good: true },
    { label: t('reports.churn'), value: '2.1%', delta: '0.4%', up: false, good: true },
])

const chips = computed(() => [
    { icon: CalendarClock, text: t('reports.chips.schedule') },
    { icon: Send, text: t('reports.chips.channels') },
    { icon: PenLine, text: t('reports.chips.tone') },
])

// Demo timeline: each entry is the delay (ms) before moving to the next step.
// 1 schedule chip -> 2 typing dots -> 3 report + typewriter -> 4 reactions -> 5 delivered -> hold -> restart
const STEP_DELAYS = [400, 900, 1400, 3200, 1200, 1300, 5000]

const card = ref<HTMLElement>()
const step = ref(0)
const typed = ref('')
let observer: IntersectionObserver | undefined
let timer = 0
let typer = 0

const typeSummary = () => {
    const full = t('reports.summary')
    let i = 0
    clearInterval(typer)
    typer = window.setInterval(() => {
        typed.value = full.slice(0, ++i)
        if (i >= full.length) clearInterval(typer)
    }, 28)
}

const advance = (index: number) => {
    if (index >= STEP_DELAYS.length) {
        step.value = 0
        typed.value = ''
        timer = window.setTimeout(() => advance(0), STEP_DELAYS[0])
        return
    }
    timer = window.setTimeout(() => {
        step.value = index + 1
        if (step.value === 3) typeSummary()
        advance(index + 1)
    }, STEP_DELAYS[index])
}

onMounted(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        step.value = 5
        typed.value = t('reports.summary')
        return
    }
    // only run the demo while the card is on screen
    observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            if (!timer) advance(0)
        } else {
            clearTimeout(timer)
            clearInterval(typer)
            timer = 0
            step.value = 0
            typed.value = ''
        }
    }, { threshold: 0.3 })
    observer.observe(card.value!)
})

onBeforeUnmount(() => {
    observer?.disconnect()
    clearTimeout(timer)
    clearInterval(typer)
})
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30">
        <div class="grid md:grid-cols-2 gap-16 items-center">
            <div v-reveal class="relative order-2 md:order-1">
                <!-- soft glow behind the card -->
                <div class="glow absolute -inset-6 -z-10 rounded-full bg-linear-to-br from-violet-500/20 to-sky-400/20 blur-3xl"></div>

                <div ref="card" class="float glass rounded-3xl p-6 space-y-4 shadow-2xl">
                    <!-- schedule chip -->
                    <div class="min-h-7">
                        <Transition name="pop">
                            <div v-if="step >= 1" class="inline-flex items-center gap-1.5 rounded-full bg-violet-400/10 border border-violet-300/20 px-3 py-1 text-xs text-violet-200">
                                <Clock class="w-3.5 h-3.5 clock" /> {{ t('reports.schedule') }}
                            </div>
                        </Transition>
                    </div>

                    <!-- Slack-style message header -->
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-lg bg-linear-to-br from-violet-300 to-sky-300"></div>
                        <div>
                            <div class="text-sm font-semibold text-white">Lumen <span class="text-xs font-normal text-white/40">9:00 AM</span></div>
                            <div class="text-xs text-white/50">#weekly-metrics</div>
                        </div>
                    </div>

                    <div class="rounded-xl bg-white/5 p-4 text-sm text-gray-300 min-h-72">
                        <!-- typing indicator -->
                        <div v-if="step === 2" class="flex items-center gap-2 text-white/50 text-xs">
                            {{ t('reports.writing') }} <TypingDots />
                        </div>

                        <!-- the report -->
                        <div v-else-if="step >= 3" class="space-y-3">
                            <div class="font-semibold text-white">{{ t('mock.report') }}</div>

                            <div class="grid grid-cols-3 gap-2">
                                <KpiTile v-for="(k, i) in kpis" :key="k.label" v-bind="k" :style="{ '--i': i }" />
                            </div>

                            <svg viewBox="0 0 200 48" class="w-full h-12" fill="none" aria-hidden="true">
                                <defs>
                                    <linearGradient id="spark" x1="0" x2="1">
                                        <stop offset="0" stop-color="#c4b5fd" />
                                        <stop offset="1" stop-color="#7dd3fc" />
                                    </linearGradient>
                                    <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0" stop-color="#c4b5fd" stop-opacity="0.25" />
                                        <stop offset="1" stop-color="#c4b5fd" stop-opacity="0" />
                                    </linearGradient>
                                </defs>
                                <path class="spark-area" d="M0 38 L30 32 L60 35 L90 22 L120 26 L150 12 L200 6 L200 48 L0 48 Z" fill="url(#spark-fill)" />
                                <path class="spark-line" pathLength="1" d="M0 38 L30 32 L60 35 L90 22 L120 26 L150 12 L200 6" stroke="url(#spark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <p class="text-xs leading-relaxed min-h-10">{{ typed }}<span v-if="step === 3" class="caret"></span></p>

                            <!-- reactions -->
                            <div class="flex gap-1.5 min-h-6">
                                <template v-if="step >= 4">
                                    <ReactionPill emoji="👍" :count="6" :style="{ '--i': 0 }" />
                                    <ReactionPill emoji="🔥" :count="3" :style="{ '--i': 1 }" />
                                    <ReactionPill emoji="👀" :count="2" :style="{ '--i': 2 }" />
                                </template>
                            </div>
                        </div>
                    </div>

                    <!-- delivery status -->
                    <div class="min-h-6">
                        <Transition name="pop">
                            <div v-if="step >= 5" class="flex items-center gap-2 text-xs text-emerald-300">
                                <CheckCheck class="w-4 h-4" /> {{ t('reports.delivered') }}
                                <span class="ml-auto flex items-center gap-1.5 text-white/40">
                                    <MessageSquare class="w-3.5 h-3.5" /><Mail class="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>

            <div v-reveal="150" class="space-y-6 order-1 md:order-2">
                <h2 class="text-[2.5rem] font-bold text-white leading-tight">{{ t('reports.title') }}</h2>
                <p class="text-lg text-gray-300">{{ t('reports.description') }}</p>
                <p class="text-lg text-gray-300">{{ t('reports.text') }}</p>
                <div class="flex flex-wrap gap-2">
                    <span
                        v-for="c in chips"
                        :key="c.text"
                        class="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-sm text-gray-200 hover:-translate-y-0.5 transition-transform"
                    >
                        <component :is="c.icon" class="w-4 h-4 text-violet-300" /> {{ c.text }}
                    </span>
                </div>
                <button class="flex items-center gap-2 font-bold text-violet-300 hover:gap-3 transition-all">
                    {{ t('reports.btn') }} <ArrowRight class="w-4 h-4" />
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.pop-enter-active {
    transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from {
    opacity: 0;
    transform: translateY(6px) scale(0.9);
}

.float {
    animation: float 7s ease-in-out infinite;
}
.glow {
    animation: glow 6s ease-in-out infinite;
}
.clock {
    animation: spin 8s linear infinite;
}

.spark-line {
    stroke-dasharray: 1;
    animation: draw 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s backwards;
}
.spark-area {
    animation: fade 1.2s ease 0.9s backwards;
}

.caret {
    display: inline-block;
    width: 1px;
    height: 0.9em;
    margin-left: 1px;
    vertical-align: -0.1em;
    background: currentColor;
    animation: blink 0.8s steps(1) infinite;
}

@keyframes float {
    50% { transform: translateY(-8px); }
}
@keyframes glow {
    50% { opacity: 0.5; transform: scale(1.08); }
}
@keyframes spin {
    to { transform: rotate(360deg); }
}
@keyframes draw {
    from { stroke-dashoffset: 1; }
}
@keyframes fade {
    from { opacity: 0; }
}
@keyframes blink {
    50% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
    .float, .glow, .clock, .spark-line, .spark-area, .caret { animation: none; }
    .pop-enter-active { transition: none; }
}
</style>
