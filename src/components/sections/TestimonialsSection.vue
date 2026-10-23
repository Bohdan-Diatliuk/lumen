<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from '@lucide/vue'
import CountUp from '../ui/CountUp.vue'
const { t } = useI18n()
const users = ['user1', 'user2', 'user3', 'user4', 'user5', 'user6']
// assets/avatars/<userKey>.webp, bundled by Vite
const avatars = import.meta.glob<string>('../../assets/avatars/*.webp', { eager: true, import: 'default' })
const avatar = (u: string) => avatars[`../../assets/avatars/${u}.webp`]

const N = users.length
const STEP = 360 / N
const reduceMotion = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

const stage = ref<HTMLElement>()
const rx = ref(380) // horizontal radius of the orbit, follows the stage width
const ry = 46 // vertical squash: back cards sit higher and smaller, which reads as depth

// Orbit rotation in degrees. Card i sits at angle i * STEP + rot; angle 0 is the front.
const rot = ref(0)
const idx = ref(0)
const dragging = ref(false)
const paused = ref(false)
let frame = 0
let timer = 0

const norm = (i: number) => ((i % N) + N) % N
const syncIdx = () => (idx.value = norm(Math.round(-rot.value / STEP)))

// Every frame of the animation sets `rot` itself (instead of a CSS transition),
// so cards travel along the real arc, even on multi-step jumps
const animateTo = (target: number) => {
    cancelAnimationFrame(frame)
    if (reduceMotion) {
        rot.value = target
        syncIdx()
        return
    }
    const from = rot.value
    const start = performance.now()
    const tick = (now: number) => {
        const p = Math.min((now - start) / 800, 1)
        rot.value = from + (target - from) * (1 - Math.pow(1 - p, 3))
        syncIdx()
        if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
}

const snapped = () => Math.round(rot.value / STEP) * STEP
const next = () => animateTo(snapped() - STEP)
const prev = () => animateTo(snapped() + STEP)
const goTo = (i: number) => {
    const want = -i * STEP
    const k = Math.round((rot.value - want) / 360) // shortest way around
    animateTo(want + k * 360)
}

// Card transform from its angle: x on the ellipse, scale/opacity from depth (1 = front, 0 = back)
const cardStyle = (i: number) => {
    const a = ((i * STEP + rot.value) * Math.PI) / 180
    const depth = (Math.cos(a) + 1) / 2
    const x = Math.sin(a) * rx.value
    const y = (depth - 1) * ry * 2
    return {
        transform: `translateX(-50%) translate(${x}px, ${y}px) scale(${0.58 + 0.42 * depth})`,
        opacity: 0.3 + 0.7 * depth,
        zIndex: Math.round(depth * 100),
    }
}

// Drag / swipe
let startX = 0
let startRot = 0
let lastX = 0
let lastT = 0
let velocity = 0 // deg per ms
let moved = 0

const onDown = (e: PointerEvent) => {
    cancelAnimationFrame(frame)
    dragging.value = true
    startX = lastX = e.clientX
    startRot = rot.value
    lastT = performance.now()
    velocity = 0
    moved = 0
    stage.value?.setPointerCapture(e.pointerId)
}
const onMove = (e: PointerEvent) => {
    if (!dragging.value) return
    const now = performance.now()
    const dt = Math.max(now - lastT, 1)
    const dx = e.clientX - lastX
    velocity = velocity * 0.6 + ((dx * 0.28) / dt) * 0.4
    lastX = e.clientX
    lastT = now
    moved = Math.max(moved, Math.abs(e.clientX - startX))
    rot.value = startRot + (e.clientX - startX) * 0.28
    syncIdx()
}
const onUp = () => {
    if (!dragging.value) return
    dragging.value = false
    // a flick carries the orbit a bit further before it settles on the nearest card
    animateTo(Math.round((rot.value + velocity * 220) / STEP) * STEP)
}
// a drag that ends on a card must not count as a click on it
const onCardClick = (i: number) => {
    if (moved > 6) return
    if (i !== idx.value) goTo(i)
}

const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
}

const measure = () => {
    if (stage.value) rx.value = Math.min(Math.max(stage.value.clientWidth * 0.36, 130), 440)
}
let ro: ResizeObserver | undefined

onMounted(() => {
    measure()
    ro = new ResizeObserver(measure)
    ro.observe(stage.value!)
    if (!reduceMotion) {
        timer = window.setInterval(() => {
            if (!paused.value && !dragging.value) next()
        }, 5500)
    }
})
onBeforeUnmount(() => {
    ro?.disconnect()
    clearInterval(timer)
    cancelAnimationFrame(frame)
})
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30">
        <h2 v-reveal class="text-[2.5rem] font-bold text-white text-center mb-4">{{ t('comments.title') }}</h2>

        <!-- overall rating -->
        <div v-reveal="100" class="flex flex-col items-center gap-2 mb-10 text-sm text-white/60">
            <div class="flex items-center gap-3">
                <span class="flex gap-0.5">
                    <Star v-for="n in 5" :key="n" class="star w-5 h-5 fill-amber-300 text-amber-300" :style="{ '--n': n }" />
                </span>
                <span class="text-2xl font-bold text-white tabular-nums"><CountUp :value="t('comments.rating')" /></span>
            </div>
            <span>{{ t('comments.ratingLabel') }}</span>
        </div>

        <div v-reveal="150" @mouseenter="paused = true" @mouseleave="paused = false" @focusin="paused = true" @focusout="paused = false">
            <!-- orbit stage: drag or swipe sideways to spin the cards -->
            <div
                ref="stage"
                class="stage relative mx-auto h-130 select-none outline-none"
                :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
                tabindex="0"
                @pointerdown="onDown"
                @pointermove="onMove"
                @pointerup="onUp"
                @pointercancel="onUp"
                @keydown="onKey"
            >
                <!-- the orbit itself -->
                <div class="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 pointer-events-none" :style="{ width: `${rx * 2}px`, height: `${ry * 2 + 40}px` }">
                    <div class="absolute inset-0 rounded-full border border-dashed border-white/10"></div>
                    <div class="absolute inset-4 rounded-full border border-white/5"></div>
                    <div class="absolute inset-0 rounded-full bg-linear-to-r from-violet-500/10 via-transparent to-sky-400/10 blur-2xl"></div>
                    <div class="satellite absolute inset-0">
                        <span class="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_12px_3px_rgb(167_139_250/0.7)]"></span>
                    </div>
                </div>

                <article
                    v-for="(u, i) in users"
                    :key="u"
                    class="card glass absolute left-1/2 top-4 w-80 md:w-96 h-96 rounded-3xl p-8 flex flex-col justify-between bg-[#1b1b2b]"
                    :class="{ 'is-front': idx === i }"
                    :style="cardStyle(i)"
                    :aria-hidden="idx !== i"
                    @click="onCardClick(i)"
                >
                    <Quote class="absolute top-6 right-6 w-10 h-10 text-violet-300/10" />

                    <div class="relative">
                        <span class="flex gap-0.5 mb-4">
                            <Star v-for="n in 5" :key="n" class="w-4 h-4 fill-amber-300 text-amber-300" />
                        </span>
                        <p class="italic text-gray-300 text-sm leading-relaxed mb-5">"{{ t(`comments.${u}.comment`) }}"</p>

                        <!-- headline result -->
                        <div class="inline-flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-2 text-left">
                            <span class="text-2xl font-bold bg-linear-to-r from-violet-300 to-sky-300 bg-clip-text text-transparent tabular-nums">
                                <CountUp v-if="idx === i" :key="`${u}-${idx}`" :value="t(`comments.${u}.metric`)" :duration="900" />
                                <template v-else>{{ t(`comments.${u}.metric`) }}</template>
                            </span>
                            <span class="text-xs text-white/60 leading-tight max-w-28">{{ t(`comments.${u}.metricLabel`) }}</span>
                        </div>
                    </div>

                    <div class="relative flex items-center gap-4">
                        <div class="relative w-12 h-12 shrink-0 rounded-full bg-linear-to-br from-violet-300 to-sky-300 p-0.5">
                            <img
                                :src="avatar(u)"
                                :alt="t(`comments.${u}.fullName`)"
                                width="48"
                                height="48"
                                loading="lazy"
                                draggable="false"
                                class="h-full w-full rounded-full object-cover"
                            />
                            <BadgeCheck class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#171725] text-emerald-300" />
                        </div>
                        <div class="text-sm">
                            <div class="font-bold text-white">{{ t(`comments.${u}.fullName`) }}</div>
                            <div class="text-white/60">{{ t(`comments.${u}.position`) }}, {{ t(`comments.${u}.company`) }}</div>
                        </div>
                    </div>
                </article>
            </div>

            <!-- controls -->
            <div class="mt-6 flex items-center justify-center gap-5">
                <button type="button" class="nav" aria-label="Previous" @click="prev"><ChevronLeft class="w-5 h-5" /></button>
                <div class="flex gap-2">
                    <button
                        v-for="(u, i) in users"
                        :key="u"
                        type="button"
                        :aria-label="`${i + 1}`"
                        class="h-2 rounded-full transition-all duration-500"
                        :class="idx === i ? 'w-6 bg-violet-300' : 'w-2 bg-white/20 hover:bg-white/40'"
                        @click="goTo(i)"
                    ></button>
                </div>
                <button type="button" class="nav" aria-label="Next" @click="next"><ChevronRight class="w-5 h-5" /></button>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* vertical scroll still works on touch; horizontal gestures belong to the orbit */
.stage {
    touch-action: pan-y;
}
.card {
    transition: border-color 0.4s ease, box-shadow 0.4s ease;
    will-change: transform;
}
.card.is-front {
    border-color: rgb(196 181 253 / 0.35);
    box-shadow: 0 20px 60px -10px rgb(124 58 237 / 0.35);
}

.satellite {
    animation: orbit 14s linear infinite;
}
@keyframes orbit {
    to { transform: rotate(360deg); }
}

.nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    color: white;
    border: 1px solid rgb(255 255 255 / 0.1);
    background: rgb(255 255 255 / 0.04);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease;
}
.nav:hover {
    background: rgb(255 255 255 / 0.1);
    transform: scale(1.1);
}

/* rating stars pop in one after another once revealed */
.reveal.is-visible .star {
    animation: star-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    animation-delay: calc(0.3s + var(--n) * 90ms);
}
@keyframes star-pop {
    from { opacity: 0; transform: scale(0) rotate(-40deg); }
}

@media (prefers-reduced-motion: reduce) {
    .satellite { animation: none; }
    .card, .nav { transition: none; }
    .reveal.is-visible .star { animation: none; }
}
</style>
