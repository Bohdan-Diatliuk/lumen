<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Send } from '@lucide/vue'
const { t } = useI18n()
const columns = [
    { title: 'product', links: ['features', 'integrations', 'pricing', 'changelog'] },
    { title: 'company', links: ['about', 'careers', 'blog', 'contact'] },
]
const legal = ['privacy', 'terms', 'cookies']
</script>

<template>
    <footer class="border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div class="max-w-300 mx-auto px-6 md:px-16 py-16">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                <div class="col-span-2 md:col-span-1">
                    <div class="text-xl font-bold text-white mb-4">Lumen</div>
                    <p class="text-gray-300">{{ t('footer.tagline') }}</p>
                </div>
                <div v-for="col in columns" :key="col.title">
                    <div class="text-xs font-semibold uppercase tracking-widest text-white mb-6">{{ t(`footer.${col.title}`) }}</div>
                    <div class="flex flex-col gap-4">
                        <a v-for="l in col.links" :key="l" href="#" class="text-gray-300 hover:text-violet-300 transition-colors">
                            {{ t(`footer.${l}`) }}
                        </a>
                    </div>
                </div>
                <div>
                    <div class="text-xs font-semibold uppercase tracking-widest text-white mb-6">{{ t('footer.subscribe') }}</div>
                    <p class="text-sm text-gray-300 mb-4">{{ t('footer.subscribeText') }}</p>
                    <form class="flex gap-2" @submit.prevent>
                        <input type="email" :placeholder="t('footer.email')"
                            class="w-full min-w-0 px-4 py-2 rounded-lg text-sm bg-black/20 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-violet-300" />
                        <button class="px-4 py-2 rounded-lg border border-violet-300/30 bg-violet-300/20 text-violet-300 hover:bg-violet-300/30 transition-colors">
                            <Send class="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
            <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
                <p>{{ t('footer.rights') }}</p>
                <div class="flex gap-6">
                    <a v-for="l in legal" :key="l" href="#" class="hover:text-violet-300 transition-colors">{{ t(`footer.${l}`) }}</a>
                </div>
            </div>
        </div>
    </footer>
</template>
