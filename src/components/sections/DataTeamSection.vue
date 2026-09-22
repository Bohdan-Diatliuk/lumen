<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import dataScreen from '../../assets/data/screen.png'
const { t } = useI18n()
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30">
        <div class="grid md:grid-cols-2 gap-16 items-center">
            <div class="relative">
                <div class="absolute -inset-4 bg-linear-to-br from-indigo-500/20 to-transparent rounded-3xl blur-[100px] z-0"></div>
                <img :src="dataScreen" alt="Data Team"
                    class="relative z-10 w-full object-cover rounded-3xl border border-white/10 shadow-2xl" />
            </div>
            <div>
                <div class="flex flex-col gap-6">
                    <h2 class="text-[2.5rem] font-bold text-white leading-tight">{{ t('dataTeam.title') }}</h2>
                    <p class="text-gray-300">{{ t('dataTeam.mainText') }}</p>
                    <p class="text-gray-300">{{ t('dataTeam.footerText') }}</p>
                </div>
            </div>
        </div>
    </section>
</template>