<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight, ArrowUp, Check, Send } from '@lucide/vue'
import LumenLogo from '../components/ui/LumenLogo.vue'
const { t } = useI18n()
const columns = [
    { title: 'product', links: ['features', 'integrations', 'pricing', 'changelog'] },
    { title: 'company', links: ['about', 'careers', 'blog', 'contact'] },
]
const legal = ['privacy', 'terms', 'cookies']
const year = new Date().getFullYear()

// lucide v1 ships no brand icons, so these are inline paths (24x24 viewBox)
const socials = [
    { name: 'GitHub', path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
    { name: 'X', path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' },
    { name: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
]

const email = ref('')
const state = ref<'idle' | 'done'>('idle')
const error = ref(false)
let timer = 0
const subscribe = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        error.value = true
        return
    }
    error.value = false
    state.value = 'done'
    timer = window.setTimeout(() => {
        state.value = 'idle'
        email.value = ''
    }, 4000)
}
onBeforeUnmount(() => clearTimeout(timer))

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
    <footer class="relative overflow-hidden bg-black/20 backdrop-blur-xl">
        <!-- top edge: a hairline with a light that travels along it -->
        <div class="edge absolute inset-x-0 top-0 h-px bg-white/10"></div>

        <div class="max-w-300 mx-auto px-6 md:px-16 pt-6 md:pt-16">
            <div v-reveal class="flex flex-wrap items-center gap-x-5 gap-y-3 mb-4 md:grid md:grid-cols-4 md:items-start md:gap-12 md:mb-12">
                <div class="w-full md:w-auto flex items-center justify-between md:block">
                    <LumenLogo class="md:mb-4" />
                    <p class="hidden md:block text-gray-300">{{ t('footer.tagline') }}</p>

                    <div class="md:mt-6 flex gap-2 md:gap-3">
                        <a v-for="s in socials" :key="s.name" href="#" :aria-label="s.name" class="social flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60">
                            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true"><path :d="s.path" /></svg>
                        </a>
                    </div>

                    <div class="hidden md:inline-flex mt-6 items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                        <span class="live relative h-2 w-2 rounded-full bg-emerald-300"></span> {{ t('footer.status') }}
                    </div>
                </div>

                <div v-for="col in columns" :key="col.title" class="max-md:contents">
                    <div class="hidden md:block text-xs font-semibold uppercase tracking-widest text-white mb-6">{{ t(`footer.${col.title}`) }}</div>
                    <div class="max-md:contents flex flex-col gap-4">
                        <a v-for="l in col.links" :key="l" href="#" class="flink group inline-flex w-fit items-center gap-1 text-sm md:text-base text-gray-300 hover:text-violet-300">
                            <span class="flink-text">{{ t(`footer.${l}`) }}</span>
                            <ArrowRight class="flink-arrow hidden md:block h-3.5 w-3.5" />
                        </a>
                    </div>
                </div>

                <div class="w-full md:w-auto">
                    <div class="hidden md:block text-xs font-semibold uppercase tracking-widest text-white mb-6">{{ t('footer.subscribe') }}</div>
                    <p class="hidden md:block text-sm text-gray-300 mb-4">{{ t('footer.subscribeText') }}</p>
                    <form class="flex gap-2" novalidate @submit.prevent="subscribe">
                        <input
                            v-model="email"
                            type="email"
                            :placeholder="t('footer.email')"
                            :aria-invalid="error"
                            :class="['w-full min-w-0 px-4 py-2 rounded-lg text-sm bg-black/20 border text-white placeholder:text-white/50 focus:outline-none transition-colors', error ? 'border-rose-400/70' : 'border-white/20 focus:border-violet-300']"
                            @input="error = false"
                        />
                        <button
                            :class="['send flex shrink-0 items-center justify-center w-10 rounded-lg border transition-colors', state === 'done' ? 'border-emerald-300/40 bg-emerald-400/20 text-emerald-300' : 'border-violet-300/30 bg-violet-300/20 text-violet-300 hover:bg-violet-300/30']"
                        >
                            <Check v-if="state === 'done'" class="w-4 h-4" />
                            <Send v-else class="send-icon w-4 h-4" />
                        </button>
                    </form>
                    <p class="mt-2 h-4 text-xs" :class="[state === 'done' ? 'text-emerald-300' : 'text-rose-300', state === 'idle' && !error && 'max-md:hidden']">
                        <template v-if="state === 'done'">{{ t('footer.subscribed') }}</template>
                        <template v-else-if="error">{{ t('footer.error') }}</template>
                    </p>
                </div>
            </div>

            <div class="border-t border-white/10 pt-4 md:pt-8 pb-4 md:pb-0 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-300">
                <p>{{ t('footer.rights', { year }) }}</p>
                <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-6">
                    <a v-for="l in legal" :key="l" href="#" class="hover:text-violet-300 transition-colors">{{ t(`footer.${l}`) }}</a>
                    <button type="button" class="top hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-3 pr-2 text-xs text-white/70 hover:text-white" @click="toTop">
                        {{ t('footer.top') }}
                        <span class="flex h-6 w-6 items-center justify-center rounded-full bg-violet-300/20 text-violet-300"><ArrowUp class="top-arrow h-3.5 w-3.5" /></span>
                    </button>
                </div>
            </div>
        </div>

        <!-- oversized wordmark, cropped by the bottom edge -->
        <div class="mark hidden md:block pointer-events-none select-none text-center font-bold leading-[0.8] text-[min(20vw,17rem)] -mb-[0.12em] pt-3 md:pt-6" aria-hidden="true">Lumen</div>
    </footer>
</template>

<style scoped>
.edge::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 30%;
    background: linear-gradient(to right, transparent, #c4b5fd, #7dd3fc, transparent);
    animation: travel 6s ease-in-out infinite;
}
@keyframes travel {
    from { transform: translateX(-100%); }
    to { transform: translateX(340%); }
}

.mark {
    background: linear-gradient(to bottom, rgb(255 255 255 / 0.1), transparent 85%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.social {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}
.social:hover {
    transform: translateY(-3px);
    color: #c4b5fd;
    border-color: rgb(196 181 253 / 0.4);
    background: rgb(196 181 253 / 0.12);
}

.live::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: inherit;
    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes ping {
    to { transform: scale(3); opacity: 0; }
}

/* link: text nudges right, arrow slides in, underline draws */
.flink-text {
    position: relative;
    transition: transform 0.3s ease;
}
.flink-text::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}
.flink-arrow {
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.flink:hover .flink-text::after {
    transform: scaleX(1);
}
.flink:hover .flink-arrow {
    opacity: 1;
    transform: none;
}

.send-icon {
    transition: transform 0.3s ease;
}
.send:hover .send-icon {
    transform: translate(2px, -2px);
}

.top {
    transition: color 0.3s ease, border-color 0.3s ease;
}
.top:hover {
    border-color: rgb(196 181 253 / 0.4);
}
.top-arrow {
    transition: transform 0.3s ease;
}
.top:hover .top-arrow {
    transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
    .edge::after, .live::after { animation: none; }
    .social, .flink-text, .flink-text::after, .flink-arrow, .send-icon, .top, .top-arrow { transition: none; }
}
</style>
