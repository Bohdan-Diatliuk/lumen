<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CircleCheck, Sparkles } from '@lucide/vue'
const { t } = useI18n()
const items = ['item1', 'item2', 'item3']

// "CLICK ME!!" nudges scattered above the heading until it has been clicked once
const clicked = ref(false)
const nudges = [
    { x: 1, y: 55, r: -8, size: 10, color: 'text-violet-300', delay: 0 },
    { x: 11, y: 5, r: 6, size: 12, color: 'text-sky-300', delay: 0.12 },
    { x: 22, y: 60, r: -4, size: 10, color: 'text-pink-400', delay: 0.24 },
    { x: 33, y: 0, r: 9, size: 14, color: 'text-violet-300', delay: 0.06 },
    { x: 45, y: 50, r: -10, size: 10, color: 'text-sky-300', delay: 0.3 },
    { x: 56, y: 8, r: 5, size: 12, color: 'text-pink-400', delay: 0.18 },
    { x: 68, y: 58, r: -6, size: 10, color: 'text-violet-300', delay: 0.36 },
    { x: 78, y: 2, r: 8, size: 13, color: 'text-sky-300', delay: 0.09 },
    { x: 89, y: 48, r: -9, size: 11, color: 'text-pink-400', delay: 0.27 },
]

// Scripted demo: each scenario types a question, "writes SQL", draws a chart, then shows the takeaway
const scenarios = [
    {
        question: 'mock.question', answer: 'mock.answer', chart: 'mock.chartBar', type: 'bar',
        sql: "SELECT region, SUM(revenue)\nFROM sales\nWHERE quarter = 'Q3'\nGROUP BY region;",
    },
    {
        question: 'mock.question2', answer: 'mock.answer2', chart: 'mock.chartLine', type: 'line',
        sql: "SELECT date, COUNT(*) AS signups\nFROM users\nWHERE date >= date_trunc('month', now())\nGROUP BY date;",
    },
]

const bars = [
    { label: 'NA', value: 62 },
    { label: 'EMEA', value: 95, highlight: true },
    { label: 'APAC', value: 71 },
    { label: 'LATAM', value: 38 },
    { label: 'MEA', value: 24 },
]

const line = [8, 12, 10, 16, 15, 22, 20, 28, 26, 38, 55, 48, 62, 70]
const lineX = (i: number) => (i / (line.length - 1)) * 240
const lineY = (v: number) => 92 - (v / 75) * 84
const linePoints = line.map((v, i) => `${lineX(i)},${lineY(v)}`).join(' ')
const lineArea = `M0,100 L${linePoints.replaceAll(' ', ' L')} L240,100 Z`

type Phase = 'typing' | 'thinking' | 'chart' | 'insight'
const idx = ref(0)
const phase = ref<Phase>('typing')
const count = ref(0)
const fading = ref(false)

const current = computed(() => scenarios[idx.value])
const question = computed(() => t(current.value.question))
const typed = computed(() => question.value.slice(0, count.value))
// ties the left-hand checklist to what the demo is showing right now
const activeItem = computed(() => ({ typing: -1, thinking: 0, chart: 1, insight: 2 })[phase.value])

const panel = ref<HTMLElement>()
let observer: IntersectionObserver | undefined
let run = 0 // bumping this cancels the running loop

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const play = async () => {
    const id = ++run
    const wait = async (ms: number) => { await sleep(ms); return id === run }
    while (true) {
        phase.value = 'typing'
        count.value = 0
        for (let n = 1; n <= question.value.length; n++) {
            count.value = n
            if (!(await wait(45))) return
        }
        if (!(await wait(450))) return
        phase.value = 'thinking'
        if (!(await wait(1700))) return
        phase.value = 'chart'
        if (!(await wait(1600))) return
        phase.value = 'insight'
        if (!(await wait(4200))) return
        fading.value = true
        if (!(await wait(500))) return
        fading.value = false
        idx.value = (idx.value + 1) % scenarios.length
    }
}

onMounted(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        count.value = question.value.length
        phase.value = 'insight'
        return
    }
    // only run while on screen
    observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) play()
        else run++
    }, { threshold: 0.4 })
    observer.observe(panel.value!)
})

onBeforeUnmount(() => {
    run++
    observer?.disconnect()
})
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30">
        <div class="grid md:grid-cols-2 gap-16 items-center">
            <div v-reveal class="space-y-8">
                <div class="click-zone relative cursor-pointer select-none" @click="clicked = true">
                    <div :class="['pointer-events-none absolute bottom-full inset-x-0 h-16 transition-opacity duration-300', clicked ? 'opacity-0' : 'opacity-100']"
                        aria-hidden="true">
                        <span v-for="(n, i) in nudges" :key="i" class="click-me absolute whitespace-nowrap font-black uppercase tracking-wider"
                            :class="n.color" :style="{ left: `${n.x}%`, top: `${n.y}%`, rotate: `${n.r}deg`, fontSize: `${n.size}px`, '--d': `${n.delay}s` }">
                            <span class="click-me-bob">{{ t('lumenAnswer.clickMe') }}</span>
                        </span>
                    </div>
                    <h2 class="text-[2.5rem] font-bold text-white leading-tight">{{ t('lumenAnswer.title') }}</h2>
                </div>
                <p class="text-lg text-gray-300">{{ t('lumenAnswer.description') }}</p>
                <ul class="space-y-4">
                    <li v-for="(i, n) in items" :key="i"
                        :class="['flex items-start gap-4 transition-colors duration-500', activeItem === n ? 'text-white' : 'text-gray-300']">
                        <CircleCheck
                            :class="['w-6 h-6 shrink-0 transition-all duration-500', activeItem === n ? 'text-sky-300 scale-125' : 'text-violet-300']" />
                        <span>{{ t(`lumenAnswer.list.${i}`) }}</span>
                    </li>
                </ul>
            </div>

            <div ref="panel" v-reveal="150" class="glass rounded-3xl shadow-2xl overflow-hidden">
                <div class="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                    <span class="w-3 h-3 rounded-full bg-pink-400/70"></span>
                    <span class="w-3 h-3 rounded-full bg-violet-300/70"></span>
                    <span class="w-3 h-3 rounded-full bg-sky-300/70"></span>
                    <span class="ml-3 flex items-center gap-2 text-sm font-semibold text-white/80">
                        <Sparkles class="w-4 h-4 text-violet-300" /> Lumen
                    </span>
                    <span class="ml-auto flex items-center gap-2 text-xs text-white/50">
                        <span class="w-2 h-2 rounded-full bg-sky-300 animate-pulse"></span> live
                    </span>
                </div>

                <div :class="['min-h-104 space-y-4 p-6 transition-opacity duration-500', fading ? 'opacity-0' : 'opacity-100']">
                    <div class="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-violet-300/20 px-4 py-3 text-sm text-white">
                        {{ typed }}<span v-if="phase === 'typing'" class="caret"></span>
                    </div>

                    <div v-if="phase === 'thinking'" :key="`think-${idx}`"
                        class="anim-up max-w-[90%] rounded-2xl rounded-bl-sm bg-white/5 p-4 space-y-3">
                        <div class="flex items-center gap-2 text-xs text-white/60">
                            <span class="flex gap-1">
                                <span v-for="d in 3" :key="d" class="w-1.5 h-1.5 rounded-full bg-violet-300 animate-bounce"
                                    :style="{ animationDelay: `${d * 120}ms` }"></span>
                            </span>
                            {{ t('mock.thinking') }}
                        </div>
                        <pre class="rounded-xl bg-black/30 p-3 text-xs leading-relaxed text-sky-300 font-mono overflow-x-auto">{{ current.sql }}</pre>
                    </div>

                    <div v-if="phase === 'chart' || phase === 'insight'" :key="`chart-${idx}`"
                        class="anim-up max-w-[90%] rounded-2xl rounded-bl-sm bg-white/5 p-4 space-y-4">
                        <span class="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/60">
                            {{ t(current.chart) }}
                        </span>

                        <div v-if="current.type === 'bar'" class="flex items-end gap-3 h-36">
                            <div v-for="(b, i) in bars" :key="b.label" class="flex-1 h-full flex flex-col items-center gap-2">
                                <div class="flex-1 w-full flex flex-col justify-end items-center gap-1">
                                    <span v-if="b.highlight" class="anim-up text-[10px] font-bold text-sky-300" style="animation-delay: 1.2s">+18%</span>
                                    <div :class="['bar-grow w-full rounded-t', b.highlight ? 'bg-linear-to-t from-violet-300 to-sky-300' : 'bg-linear-to-t from-violet-400/50 to-sky-300/50']"
                                        :style="{ height: `${b.value}%`, '--i': i }"></div>
                                </div>
                                <span class="text-[10px] text-white/50">{{ b.label }}</span>
                            </div>
                        </div>

                        <svg v-else viewBox="0 0 240 100" class="h-36 w-full text-sky-300" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0" stop-color="currentColor" stop-opacity="0.35" />
                                    <stop offset="1" stop-color="currentColor" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                            <path :d="lineArea" fill="url(#lineFill)" class="line-fill" />
                            <polyline :points="linePoints" pathLength="1" fill="none" stroke="currentColor" stroke-width="2.5"
                                stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" class="line-trace" />
                        </svg>

                        <p v-if="phase === 'insight'" class="anim-up text-sm text-white/80">
                            {{ t(current.answer) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
