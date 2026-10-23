<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { EyeOff, Hash } from '@lucide/vue'
import dataScreen from '../../assets/data/screen.webp'
import CountUp from '../ui/CountUp.vue'
const { t } = useI18n()
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30">
        <div class="grid md:grid-cols-2 gap-16 items-center">
            <div v-reveal class="relative">
                <div class="absolute -inset-4 bg-linear-to-br from-indigo-500/20 to-transparent rounded-3xl blur-[100px] z-0"></div>
                <img :src="dataScreen" alt="Data Team" loading="lazy" decoding="async"
                    class="relative z-10 w-full object-cover rounded-3xl border border-white/10 shadow-2xl" />

                <!-- Floating chips: outer element pops in, inner one floats forever -->
                <div class="chip-pop absolute z-20 -top-3 right-2 md:-right-8 max-w-[75%] md:max-w-70" style="--i: 0">
                    <div class="chip-float glass flex items-start gap-3 rounded-2xl bg-[#171725]/60 p-3 backdrop-blur-md">
                        <div class="w-8 h-8 shrink-0 rounded-full bg-linear-to-br from-violet-300 to-sky-300"></div>
                        <div class="text-sm">
                            <div class="flex items-center gap-1 text-xs text-white/50">
                                <Hash class="w-3 h-3" /> ad-hoc-requests
                            </div>
                            <div class="text-white">{{ t('dataTeam.chips.question') }}</div>
                        </div>
                    </div>
                </div>
                <div class="chip-pop absolute z-20 bottom-6 left-2 md:-left-8" style="--i: 1">
                    <div class="chip-float glass rounded-2xl bg-[#171725]/60 px-4 py-3 backdrop-blur-md">
                        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60">
                            <span class="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                            {{ t('dataTeam.chips.backlog') }}
                        </div>
                        <div class="text-2xl font-bold text-white tabular-nums">
                            <CountUp value="128" /> <span class="text-sm font-normal text-white/60">{{ t('dataTeam.chips.requests') }}</span>
                        </div>
                    </div>
                </div>
                <div class="chip-pop absolute z-20 bottom-4 right-2 md:-right-4" style="--i: 2">
                    <div class="chip-float glass flex items-center gap-3 rounded-2xl bg-[#171725]/60 px-4 py-3 backdrop-blur-md">
                        <EyeOff class="w-5 h-5 text-sky-300" />
                        <div class="text-sm">
                            <div class="text-xs text-white/50">{{ t('dataTeam.chips.views') }}</div>
                            <div class="font-semibold text-white">{{ t('dataTeam.chips.viewsValue') }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-reveal="150">
                <div class="flex flex-col gap-6">
                    <h2 class="text-[2.5rem] font-bold text-white leading-tight">{{ t('dataTeam.title') }}</h2>
                    <p class="text-gray-300">{{ t('dataTeam.mainText') }}</p>
                    <p class="text-gray-300">{{ t('dataTeam.footerText') }}</p>
                </div>
            </div>
        </div>
    </section>
</template>