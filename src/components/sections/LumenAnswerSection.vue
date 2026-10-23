<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CircleCheck } from '@lucide/vue'
const { t } = useI18n()
const items = ['item1', 'item2', 'item3']
const bars = [40, 65, 50, 80, 95, 70]
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30">
        <div class="grid md:grid-cols-2 gap-16 items-center">
            <div v-reveal class="space-y-8">
                <h2 class="text-[2.5rem] font-bold text-white leading-tight">{{ t('lumenAnswer.title') }}</h2>
                <p class="text-lg text-gray-300">{{ t('lumenAnswer.description') }}</p>
                <ul class="space-y-4">
                    <li v-for="i in items" :key="i" class="flex items-start gap-4 text-gray-300">
                        <CircleCheck class="w-6 h-6 text-violet-300 shrink-0" />
                        <span>{{ t(`lumenAnswer.list.${i}`) }}</span>
                    </li>
                </ul>
            </div>
            <div v-reveal="150" class="glass rounded-3xl p-6 space-y-4 shadow-2xl">
                <div class="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-violet-300/20 px-4 py-3 text-sm text-white">
                    {{ t('mock.question') }}
                </div>
                <div class="max-w-[90%] rounded-2xl rounded-bl-sm bg-white/5 p-4 space-y-4">
                    <div class="flex items-end gap-2 h-32">
                        <div v-for="(b, i) in bars" :key="i" class="bar-grow flex-1 rounded-t bg-linear-to-t from-violet-400/60 to-sky-300/80"
                            :style="{ height: `${b}%`, '--i': i }"></div>
                    </div>
                    <p class="text-xs text-white/60">{{ t('mock.answer') }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
