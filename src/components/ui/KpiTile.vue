<script setup lang="ts">
import { ArrowDownRight, ArrowUpRight } from '@lucide/vue'
import CountUp from './CountUp.vue'

// `good` colors the delta green/red independently of its direction (lower churn is good)
defineProps<{ label: string; value: string; delta: string; up: boolean; good: boolean }>()
</script>

<template>
    <div class="tile rounded-lg bg-white/5 border border-white/5 p-2.5">
        <div class="text-[0.65rem] uppercase tracking-wide text-white/40 truncate">{{ label }}</div>
        <div class="text-base font-semibold text-white mt-0.5"><CountUp :value="value" :duration="1200" /></div>
        <div class="flex items-center gap-0.5 text-[0.7rem] font-medium" :class="good ? 'text-emerald-300' : 'text-rose-300'">
            <component :is="up ? ArrowUpRight : ArrowDownRight" class="w-3 h-3" />{{ delta }}
        </div>
    </div>
</template>

<style scoped>
.tile {
    animation: tile-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
    animation-delay: calc(var(--i, 0) * 120ms);
}

@keyframes tile-in {
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
}

@media (prefers-reduced-motion: reduce) {
    .tile { animation: none; }
}
</style>
