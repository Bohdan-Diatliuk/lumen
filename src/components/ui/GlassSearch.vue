<script setup lang="ts">
import { Snowflake, Leaf, Droplet, Flame, Wind } from '@lucide/vue';
</script>

<template>
    <section class="py-16 relative z-10">
        <div class="max-w-300 mx-auto px-6 md:px-16">
            <div
                class="rounded-3xl border border-white/7 bg-white/2 bg-clip-padding backdrop-blur-[6px] shadow-[2px_8px_32px_0_rgba(0,0,0,0.3)] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <p class="text-sm font-medium uppercase tracking-wide text-white/60 whitespace-nowrap">
                    Powering data decisions at
                </p>
                <div class="flex flex-wrap justify-center md:justify-end items-center gap-12 w-full opacity-60 grayscale">
                    <Snowflake class="w-9 h-9" />
                    <Leaf class="w-9 h-9" />
                    <Droplet class="w-9 h-9" />
                    <Flame class="w-9 h-9" />
                    <Wind class="w-9 h-9" />
                </div>
            </div>
        </div>
    </section>
</template>
