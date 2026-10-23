<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Users, MessageSquareText, Clock, ShieldCheck } from '@lucide/vue'
import CountUp from '../ui/CountUp.vue'
const { t } = useI18n()
// `fill` is how far the bar under each number grows on reveal (visual flavour, not a real metric)
const stats = [
    { value: '12k+', key: 'teams', color: 'text-violet-300', bar: 'from-violet-300 to-violet-500', glow: '167 139 250', icon: Users, fill: 72 },
    { value: '40M', key: 'answer', color: 'text-sky-300', bar: 'from-sky-300 to-sky-500', glow: '56 189 248', icon: MessageSquareText, fill: 88 },
    { value: '6.5h', key: 'save', color: 'text-pink-400', bar: 'from-pink-300 to-pink-500', glow: '244 114 182', icon: Clock, fill: 55 },
    { value: '99.9%', key: 'sla', color: 'text-white', bar: 'from-emerald-300 to-emerald-500', glow: '52 211 153', icon: ShieldCheck, fill: 99.9 },
]

// Spotlight follows the cursor inside each tile via CSS variables (no re-render needed)
const track = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<template>
    <section class="py-12 px-6 md:px-16">
        <div v-reveal class="glass max-w-300 mx-auto rounded-[40px] p-4 md:p-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div
                    v-for="(s, i) in stats"
                    :key="s.key"
                    class="stat group relative overflow-hidden rounded-3xl p-6 md:p-8"
                    :style="{ '--glow': s.glow, '--i': i }"
                    @mousemove="track"
                >
                    <component :is="s.icon" :class="['icon mx-auto mb-4 w-6 h-6', s.color]" />
                    <div :class="['relative text-4xl md:text-5xl font-bold mb-2 tabular-nums', s.color]"><CountUp :value="s.value" /></div>
                    <div class="relative text-xs font-semibold uppercase tracking-widest text-white/60">{{ t(`data.${s.key}`) }}</div>

                    <!-- bar grows when the section is revealed -->
                    <div class="relative mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                        <div :class="['bar-grow-x h-full rounded-full bg-linear-to-r', s.bar]" :style="{ width: `${s.fill}%` }"></div>
                    </div>

                    <!-- hint slides in on hover -->
                    <p class="hint relative text-xs text-white/50">{{ t(`data.${s.key}Hint`) }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.stat {
    border: 1px solid transparent;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, background-color 0.4s ease;
}
/* cursor spotlight */
.stat::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--glow) / 0.18), transparent 70%);
    transition: opacity 0.4s ease;
}
.stat:hover {
    transform: translateY(-4px);
    border-color: rgb(var(--glow) / 0.3);
    background-color: rgb(255 255 255 / 0.03);
}
.stat:hover::before {
    opacity: 1;
}
.stat:hover .icon {
    transform: scale(1.2) rotate(-6deg);
}
.icon {
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* reserved height + fade, so the tile doesn't jump when the hint appears */
.hint {
    margin-top: 0.75rem;
    min-height: 2rem;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.35s ease, transform 0.35s ease;
}
.stat:hover .hint,
.stat:focus-within .hint {
    opacity: 1;
    transform: none;
}

.bar-grow-x {
    transform-origin: left;
}
.reveal.is-visible .bar-grow-x {
    animation: bar-x 1.4s cubic-bezier(0.22, 1, 0.36, 1) backwards;
    animation-delay: calc(0.4s + var(--i) * 120ms);
}
@keyframes bar-x {
    from { transform: scaleX(0); }
}

@media (hover: none) {
    .hint { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
    .stat, .icon, .hint { transition: none; }
    .reveal.is-visible .bar-grow-x { animation: none; }
}
</style>
