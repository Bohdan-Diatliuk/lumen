<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, ShieldCheck, CreditCard, CalendarX } from '@lucide/vue'
const { t } = useI18n()

// `monthly` is the list price; yearly billing takes 20% off, rounded to whole dollars
const plans = [
    { key: 'startCard', items: 4, popular: false, btn: 'start', monthly: 49 },
    { key: 'proCard', items: 5, popular: true, btn: 'start', monthly: 199 },
    { key: 'customCard', items: 5, popular: false, btn: 'contact', monthly: null },
]
const trust = [
    { icon: ShieldCheck, key: 'trust1' },
    { icon: CreditCard, key: 'trust2' },
    { icon: CalendarX, key: 'trust3' },
]

const yearly = ref(false)
const target = (monthly: number | null) => (monthly === null ? 0 : Math.round(monthly * (yearly.value ? 0.8 : 1)))

// Displayed prices tween to the new value when the billing switch flips
const shown = ref(plans.map((p) => target(p.monthly)))
let frame = 0
watch(yearly, () => {
    cancelAnimationFrame(frame)
    const from = [...shown.value]
    const to = plans.map((p) => target(p.monthly))
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        shown.value = to
        return
    }
    const start = performance.now()
    const tick = (now: number) => {
        const p = Math.min((now - start) / 600, 1)
        const e = 1 - Math.pow(1 - p, 3)
        shown.value = from.map((f, i) => Math.round(f + (to[i] - f) * e))
        if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(frame))

const billing = computed(() => t(yearly.value ? 'pricingExtra.billedYearly' : 'pricingExtra.billedMonthly'))

// Spotlight follows the cursor inside each card via CSS variables
const track = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30">
        <div v-reveal class="text-center mb-10">
            <h2 class="text-[2.5rem] font-bold text-white mb-4">{{ t('price.title') }}</h2>
            <p class="text-lg text-gray-300">{{ t('price.subTitle') }}</p>
        </div>

        <!-- billing switch -->
        <div v-reveal="80" class="flex justify-center items-center gap-3 mb-14">
            <div class="glass relative grid grid-cols-2 rounded-full p-1 text-sm font-semibold">
                <span
                    class="thumb absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-linear-to-r from-violet-300 to-sky-300"
                    :style="{ transform: yearly ? 'translateX(100%)' : 'none' }"
                ></span>
                <button type="button" class="seg" :class="!yearly && 'is-on'" :aria-pressed="!yearly" @click="yearly = false">{{ t('pricingExtra.monthly') }}</button>
                <button type="button" class="seg" :class="yearly && 'is-on'" :aria-pressed="yearly" @click="yearly = true">{{ t('pricingExtra.yearly') }}</button>
            </div>
            <span class="save inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300" :class="yearly && 'is-on'">
                {{ t('pricingExtra.save') }}
            </span>
        </div>

        <div class="grid md:grid-cols-3 gap-8 items-center">
            <div v-for="(p, i) in plans" :key="p.key" v-reveal="i * 120" :class="p.popular && 'md:scale-105'">
                <div :class="['card glass group relative h-full overflow-hidden rounded-3xl p-8', p.popular && 'is-pro border-violet-300/50 bg-white/10']" @mousemove="track">
                    <div
                        v-if="p.popular"
                        class="shimmer absolute -top-0 left-1/2 -translate-x-1/2 rounded-b-xl px-4 py-1 text-[10px] font-bold tracking-wider text-[#171725] bg-linear-to-r from-violet-300 via-sky-200 to-violet-300"
                    >
                        {{ t('pricingExtra.popular') }}
                    </div>

                    <div class="relative">
                        <h3 class="text-2xl font-semibold text-white mb-2" :class="p.popular && 'mt-3'">{{ t(`price.${p.key}.title`) }}</h3>
                        <div class="mb-1">
                            <span class="text-4xl font-bold text-white tabular-nums">{{ p.monthly === null ? t(`price.${p.key}.price`) : `$${shown[i]}` }}</span>
                            <span v-if="t(`price.${p.key}.month`)" class="text-gray-300">/{{ t(`price.${p.key}.month`) }}</span>
                        </div>
                        <div class="mb-6 h-4 text-xs text-white/40">
                            <Transition name="fade" mode="out-in">
                                <span v-if="p.monthly !== null" :key="billing">{{ billing }}</span>
                            </Transition>
                        </div>
                        <p class="text-gray-300 mb-8 min-h-12">{{ t(`price.${p.key}.description`) }}</p>
                        <button
                            :class="['btn w-full py-3 rounded-full font-bold mb-8 transition-colors', p.popular ? 'bg-violet-300 text-[#31009a] hover:bg-violet-200' : 'border border-white/20 bg-white/5 hover:bg-white/10']">
                            {{ t(`pricingExtra.${p.btn}`) }}
                        </button>
                        <ul class="space-y-4">
                            <li v-for="n in p.items" :key="n" class="item flex items-center gap-3 text-gray-300" :style="{ '--n': n }">
                                <span class="tick flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-300/15">
                                    <Check class="w-3 h-3 text-violet-300" />
                                </span>
                                {{ t(`price.${p.key}.list.item${n}`) }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- reassurance -->
        <div v-reveal="200" class="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/60">
            <span v-for="x in trust" :key="x.key" class="inline-flex items-center gap-2">
                <component :is="x.icon" class="w-4 h-4 text-emerald-300" /> {{ t(`pricingExtra.${x.key}`) }}
            </span>
        </div>
    </section>
</template>

<style scoped>
.thumb {
    transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1);
}
.seg {
    position: relative;
    padding: 0.5rem 1.5rem;
    border-radius: 9999px;
    color: rgb(255 255 255 / 0.6);
    transition: color 0.3s ease;
}
.seg.is-on {
    color: #171725;
}

.save {
    opacity: 0.55;
    transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.save.is-on {
    opacity: 1;
    transform: scale(1.08);
}

.card {
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, box-shadow 0.4s ease;
}
.card::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    background: radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgb(167 139 250 / 0.16), transparent 70%);
    transition: opacity 0.4s ease;
}
.card:hover {
    transform: translateY(-6px);
    border-color: rgb(196 181 253 / 0.3);
}
.card:hover::before {
    opacity: 1;
}

/* Pro card: breathing glow */
.is-pro {
    animation: pro-glow 4s ease-in-out infinite;
}
@keyframes pro-glow {
    0%, 100% { box-shadow: 0 0 30px rgb(202 190 255 / 0.12); }
    50% { box-shadow: 0 0 60px rgb(202 190 255 / 0.3); }
}

.shimmer {
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
}
@keyframes shimmer {
    to { background-position: -200% 0; }
}

/* feature list ticks pop in once the card is revealed, staggered */
.reveal.is-visible .item {
    animation: item-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards;
    animation-delay: calc(0.4s + var(--n) * 80ms);
}
.reveal.is-visible .tick {
    animation: tick-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    animation-delay: calc(0.5s + var(--n) * 80ms);
}
.item:hover .tick {
    background: rgb(196 181 253 / 0.3);
}
@keyframes item-in {
    from { opacity: 0; transform: translateX(-10px); }
}
@keyframes tick-pop {
    from { transform: scale(0); }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
    .thumb, .seg, .save, .card, .fade-enter-active, .fade-leave-active { transition: none; }
    .is-pro, .shimmer, .reveal.is-visible .item, .reveal.is-visible .tick { animation: none; }
}
</style>
