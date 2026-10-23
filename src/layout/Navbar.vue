<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Menu, X } from '@lucide/vue';
import LumenLogo from '../components/ui/LumenLogo.vue';

const { t, locale } = useI18n();
const open = ref(false);
const nav = ref<HTMLElement>();
const links = ['product', 'features', 'pricing', 'customers', 'resources'];
const langs = [
    { code: 'en', label: 'langEn' },
    { code: 'ua', label: 'langUa' },
];

const scrollTo = (id: string) => {
    open.value = false;
    document.getElementById(id)?.scrollIntoView();
    history.replaceState(null, '', location.pathname + location.search);
};

// mobile menu closes on Escape or a tap outside the navbar
const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (open.value = false);
const onOutside = (e: PointerEvent) => {
    if (open.value && !nav.value?.contains(e.target as Node)) open.value = false;
};
onMounted(() => {
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
});
onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('pointerdown', onOutside);
});
</script>

<template>
    <nav
        ref="nav"
        class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-7xl rounded-full border border-white/7 bg-white/2 bg-clip-padding backdrop-blur-[6px] shadow-[2px_8px_32px_0_rgba(0,0,0,0.3)]">
        <div class="flex items-center justify-between gap-4 px-6 py-3">
            <a href="#top" @click.prevent="scrollTo('top')" aria-label="Lumen"><LumenLogo /></a>

            <ul class="hidden md:flex items-center gap-8">
                <li v-for="link in links" :key="link">
                    <a :href="`#${link}`" @click.prevent="scrollTo(link)"
                        class="text-sm font-medium uppercase tracking-wide text-white/80 hover:text-white transition-colors duration-300">
                        {{ t(`navbar.${link}`) }}
                    </a>
                </li>
            </ul>

            <div class="flex items-center gap-4">
                <div class="hidden md:flex items-center rounded-full border border-white/20 bg-white/10 p-0.5 text-sm font-semibold">
                    <button v-for="l in langs" :key="l.code" type="button" @click="locale = l.code"
                        :class="['px-3 py-1.5 rounded-full transition', locale === l.code ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white']">
                        {{ t(`navbar.${l.label}`) }}
                    </button>
                </div>

                <!-- burger, mobile only -->
                <button type="button" class="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white"
                    :aria-expanded="open" aria-label="Menu" @click="open = !open">
                    <Transition name="icon" mode="out-in">
                        <X v-if="open" class="h-5 w-5" />
                        <Menu v-else class="h-5 w-5" />
                    </Transition>
                </button>
            </div>
        </div>

        <!-- mobile menu -->
        <Transition name="menu">
            <div v-if="open" class="md:hidden absolute inset-x-0 top-full mt-2 overflow-hidden rounded-3xl border border-white/10 bg-[#171725]/90 p-3 shadow-[2px_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-xl">
                <ul class="flex flex-col">
                    <li v-for="(link, i) in links" :key="link" class="menu-item" :style="{ '--i': i }">
                        <a :href="`#${link}`" @click.prevent="scrollTo(link)"
                            class="block rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-wide text-white/80 active:bg-white/10 hover:bg-white/5 hover:text-white transition-colors">
                            {{ t(`navbar.${link}`) }}
                        </a>
                    </li>
                </ul>

                <!-- language switch lives in the menu on mobile -->
                <div class="menu-item mt-2 border-t border-white/10 pt-3" :style="{ '--i': links.length }">
                    <div class="grid grid-cols-2 rounded-full border border-white/20 bg-white/10 p-0.5 text-sm font-semibold">
                        <button v-for="l in langs" :key="l.code" type="button" @click="locale = l.code"
                            :class="['py-2 rounded-full transition', locale === l.code ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white']">
                            {{ t(`navbar.${l.label}`) }}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
    transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    transform-origin: top;
}
.menu-enter-from,
.menu-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
}
.menu-enter-active .menu-item {
    animation: item-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) backwards;
    animation-delay: calc(0.08s + var(--i) * 50ms);
}
@keyframes item-in {
    from { opacity: 0; transform: translateX(-10px); }
}

.icon-enter-active,
.icon-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}
.icon-enter-from {
    opacity: 0;
    transform: rotate(-90deg);
}
.icon-leave-to {
    opacity: 0;
    transform: rotate(90deg);
}

@media (prefers-reduced-motion: reduce) {
    .menu-enter-active, .menu-leave-active, .icon-enter-active, .icon-leave-active { transition: none; }
    .menu-enter-active .menu-item { animation: none; }
}
</style>
