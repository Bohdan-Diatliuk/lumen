<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

// Snaps an image in from the left edge, holds it, then snaps it back out.
// Plays on a click of `trigger`; clicks while he is leaving are ignored.
const props = defineProps<{ trigger: string; src: string; hold?: number }>()

const { t } = useI18n()

type Phase = 'hidden' | 'in' | 'shown' | 'out'
const phase = ref<Phase>('hidden')
const failed = ref(false) // the file may not exist yet: render nothing instead of a broken image

const timers: number[] = []
let exitTimers: number[] = []
const later = (list: number[], fn: () => void, ms: number) => list.push(window.setTimeout(fn, ms))

// Which line the bubble says: greeting, reaction to a click, or goodbye
type Msg = 'hello' | 'here' | 'bye'
const msg = ref<Msg>('hello')

// Always says goodbye first, then leaves 2s later so it can be read
const scheduleExit = (hold: number) => {
    exitTimers.splice(0).forEach(clearTimeout)
    later(exitTimers, () => (msg.value = 'bye'), hold)
    later(exitTimers, () => (phase.value = 'out'), hold + 2000)
    later(exitTimers, () => (phase.value = 'hidden'), hold + 2000 + 250)
}

const start = () => {
    msg.value = 'hello'
    phase.value = 'in'
    later(timers, () => (phase.value = 'shown'), 300)
    scheduleExit(300 + (props.hold ?? 5000))
}

const play = () => {
    if (phase.value === 'hidden') return start()
    // already out and sliding away: ignore, otherwise the exit animation would replay
    if (phase.value === 'out') return
    // a click while he is here: he answers and stays a bit longer, then says goodbye as usual
    msg.value = 'here'
    scheduleExit(3500)
}

let triggerEl: Element | null = null

onMounted(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    triggerEl = document.querySelector(props.trigger)
    triggerEl?.addEventListener('click', play)
})

onBeforeUnmount(() => {
    triggerEl?.removeEventListener('click', play)
    timers.forEach(clearTimeout)
    exitTimers.forEach(clearTimeout)
})
</script>

<template>
    <div v-if="!failed" aria-hidden="true"
        :class="['glitch-popup pointer-events-none fixed inset-y-0 left-0 z-40 my-auto h-fit w-[50vw] max-w-md', {
            'is-in': phase === 'in', 'is-out': phase === 'out', 'is-hidden': phase === 'hidden',
        }]">
        <img :src="src" alt="" decoding="async" @error="failed = true"
            class="block w-full drop-shadow-[0_0_40px_rgba(202,190,255,0.35)]" />
        <div :key="msg" class="popup-bubble absolute left-[72%] top-[6%] w-[min(14rem,52vw)] rounded-2xl rounded-bl-sm border border-violet-300/40 bg-[#1d1b33] px-4 py-3 text-sm font-semibold leading-snug text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {{ t(`mascot.${msg}`) }}
        </div>
    </div>
</template>
