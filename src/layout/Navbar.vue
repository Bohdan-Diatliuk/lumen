<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const links = ['product', 'features', 'pricing', 'customers', 'resources'];
const langs = [
    { code: 'en', label: 'langEn' },
    { code: 'ua', label: 'langUa' },
];

const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView();
    history.replaceState(null, '', location.pathname + location.search);
};
</script>

<template>
    <nav
        class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-7xl rounded-full border border-white/7 bg-white/2 bg-clip-padding backdrop-blur-[6px] shadow-[2px_8px_32px_0_rgba(0,0,0,0.3)]">
        <div class="flex items-center justify-between gap-4 px-6 py-3">
            <a href="#top" @click.prevent="scrollTo('top')" class="text-xl font-bold">Lumen</a>

            <ul class="hidden md:flex items-center gap-8">
                <li v-for="link in links" :key="link">
                    <a :href="`#${link}`" @click.prevent="scrollTo(link)"
                        class="text-sm font-medium uppercase tracking-wide text-white/80 hover:text-white transition-colors duration-300">
                        {{ t(`navbar.${link}`) }}
                    </a>
                </li>
            </ul>

            <div class="flex items-center gap-4">
                <div class="flex items-center rounded-full border border-white/20 bg-white/10 p-0.5 text-sm font-semibold">
                    <button v-for="l in langs" :key="l.code" type="button" @click="locale = l.code"
                        :class="['px-3 py-1.5 rounded-full transition', locale === l.code ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white']">
                        {{ t(`navbar.${l.label}`) }}
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>
