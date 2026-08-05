<script setup lang="ts">
const links = ['Product', 'Features', 'Pricing', 'Customers', 'Resources'];
</script>

<template>
    <nav
        class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-7xl rounded-full border border-white/7 bg-white/2 bg-clip-padding backdrop-blur-[6px] shadow-[2px_8px_32px_0_rgba(0,0,0,0.3)]">
        <div class="flex items-center justify-between gap-4 px-6 py-3">
            <div class="text-xl font-bold">Lumen</div>

            <ul class="hidden md:flex items-center gap-8">
                <li v-for="link in links" :key="link">
                    <a href="#"
                        class="text-sm font-medium uppercase tracking-wide text-white/80 hover:text-white transition-colors duration-300">
                        {{ link }}
                    </a>
                </li>
            </ul>

            <div class="flex items-center gap-4">
                <button class="hidden sm:block text-sm font-medium text-white/80 hover:text-white transition-colors">
                    Log in
                </button>
                <button
                    class="px-5 py-2 rounded-full border border-white/20 bg-white/10 text-sm font-semibold hover:bg-white/15 active:scale-95 transition">
                    Start Free Trial
                </button>
            </div>
        </div>
    </nav>
</template>
