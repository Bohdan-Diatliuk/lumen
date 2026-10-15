<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const users = ['user1', 'user2', 'user3']
const initials = (name: string) => name.split(' ').map(w => w[0]).join('')
</script>

<template>
    <section class="max-w-300 mx-auto px-6 md:px-16 py-30">
        <h2 class="text-[2.5rem] font-bold text-white text-center mb-16">{{ t('comments.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
            <div v-for="(u, i) in users" :key="u"
                :class="['glass rounded-3xl p-8 flex flex-col justify-between', i === 1 && 'md:-translate-y-4']">
                <p class="italic text-gray-300 mb-8">"{{ t(`comments.${u}.comment`) }}"</p>
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-linear-to-br from-violet-300 to-sky-300 text-[#171725] font-bold flex items-center justify-center">
                        {{ initials(t(`comments.${u}.fullName`)) }}
                    </div>
                    <div class="text-sm">
                        <div class="font-bold text-white">{{ t(`comments.${u}.fullName`) }}</div>
                        <div class="text-white/60">{{ t(`comments.${u}.position`) }}, {{ t(`comments.${u}.company`) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
