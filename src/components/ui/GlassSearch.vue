<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Snowflake, Leaf, Droplet, Flame, Wind } from '@lucide/vue';
const { t } = useI18n();

const icons = [
    { icon: Snowflake, anim: 'icon-spin', hover: 'hover:text-sky-300' },
    { icon: Leaf, anim: 'icon-sway', hover: 'hover:text-violet-300' },
    { icon: Droplet, anim: 'icon-bob', hover: 'hover:text-sky-300' },
    { icon: Flame, anim: 'icon-flicker', hover: 'hover:text-pink-400' },
    { icon: Wind, anim: 'icon-drift', hover: 'hover:text-violet-300' },
];
</script>

<template>
    <section class="py-16 relative z-10">
        <div class="max-w-300 mx-auto px-6 md:px-16">
            <div v-reveal
                class="rounded-3xl border border-white/7 bg-white/2 bg-clip-padding backdrop-blur-[6px] shadow-[2px_8px_32px_0_rgba(0,0,0,0.3)] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <p class="text-sm font-medium uppercase tracking-wide text-white/60 whitespace-nowrap">
                    {{ t('poweredBy') }}
                </p>
                <div class="flex flex-wrap justify-center md:justify-end items-center gap-12 w-full">
                    <component v-for="i in icons" :key="i.anim" :is="i.icon"
                        :class="['w-9 h-9 text-white/50 cursor-pointer transition-[color,scale] duration-300 hover:scale-125', i.anim, i.hover]" />
                </div>
            </div>
        </div>
    </section>
</template>
