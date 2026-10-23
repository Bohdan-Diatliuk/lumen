<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// "12k+" -> number 12, suffix "k+"; "6.5h" keeps one decimal
const props = defineProps<{ value: string; duration?: number }>()

const match = props.value.match(/^([\d.]+)(.*)$/)
const target = match ? parseFloat(match[1]) : 0
const suffix = match ? match[2] : ''
const decimals = match?.[1].split('.')[1]?.length ?? 0

const root = ref<HTMLElement>()
const current = ref(0)
let observer: IntersectionObserver | undefined
let frame = 0

const run = () => {
    const duration = props.duration ?? 1600
    const start = performance.now()
    const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        current.value = target * (1 - Math.pow(1 - p, 3)) // ease-out cubic
        if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
}

onMounted(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        current.value = target
        return
    }
    observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        observer?.disconnect()
        run()
    }, { threshold: 0.5 })
    observer.observe(root.value!)
})

onBeforeUnmount(() => {
    observer?.disconnect()
    cancelAnimationFrame(frame)
})
</script>

<template>
    <span ref="root">{{ current.toFixed(decimals) }}{{ suffix }}</span>
</template>
