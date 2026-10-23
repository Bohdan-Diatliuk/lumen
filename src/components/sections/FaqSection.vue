<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDown, MessageCircle, SearchX, Search, ThumbsDown, ThumbsUp } from '@lucide/vue'
const { t, tm } = useI18n()

// Category of each question, by its index in faq.items
const cats = ['security', 'data', 'product', 'data', 'product', 'pricing', 'product', 'security', 'data', 'pricing', 'product']
const catKeys = ['all', 'security', 'data', 'product', 'pricing']

const query = ref('')
const cat = ref('all')
const open = ref<number | null>(0) // one answer open at a time
const votes = reactive<Record<number, 'up' | 'down'>>({})

const list = computed(() => {
    const q = query.value.trim().toLowerCase()
    return (tm('faq.items') as { q: string; a: string }[])
        .map((item, idx) => ({ ...item, idx, cat: cats[idx] }))
        .filter((x) => (cat.value === 'all' || x.cat === cat.value) && (!q || `${x.q} ${x.a}`.toLowerCase().includes(q)))
})

// The list lives in a fixed-height scroll box, so opening an answer or filtering never moves the page below it
const box = ref<HTMLElement>()
const atTop = ref(true)
const atBottom = ref(false)
const updateEdges = () => {
    const el = box.value
    if (!el) return
    atTop.value = el.scrollTop <= 2
    atBottom.value = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
}

const toggle = async (idx: number) => {
    open.value = open.value === idx ? null : idx
    if (open.value === null) return
    // once the answer has grown, bring the whole item into view inside the box
    await nextTick()
    setTimeout(() => {
        box.value?.querySelector(`[data-idx="${idx}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }, 460)
}

watch([query, cat], async () => {
    box.value?.scrollTo({ top: 0 })
    await nextTick()
    updateEdges()
})
watch(open, () => setTimeout(updateEdges, 480))
onMounted(() => nextTick(updateEdges))
</script>

<template>
    <section class="max-w-3xl mx-auto px-6 md:px-16 py-30">
        <h2 v-reveal class="text-[2.5rem] font-bold text-white text-center mb-10">{{ t('faq.title') }}</h2>

        <!-- search + categories -->
        <div v-reveal="80" class="mb-8 space-y-4">
            <label class="search glass flex items-center gap-3 rounded-full px-5 py-3">
                <Search class="w-4 h-4 text-white/40" />
                <input
                    v-model="query"
                    type="search"
                    :placeholder="t('faq.search')"
                    class="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
                />
            </label>
            <div class="flex flex-wrap justify-center gap-2">
                <button
                    v-for="c in catKeys"
                    :key="c"
                    type="button"
                    :aria-pressed="cat === c"
                    class="chip rounded-full px-4 py-1.5 text-sm font-medium"
                    :class="cat === c ? 'is-on' : ''"
                    @click="cat = c"
                >
                    {{ t(`faq.cats.${c}`) }}
                </button>
            </div>
        </div>

        <div v-reveal="140">
        <div
            ref="box"
            class="scroll-box h-96 overflow-y-auto overscroll-contain px-1 py-1"
            :style="{ '--ft': atTop ? '0px' : '36px', '--fb': atBottom ? '0px' : '36px' }"
            @scroll.passive="updateEdges"
        >
        <TransitionGroup name="list" tag="div" class="relative space-y-4">
            <div
                v-for="item in list"
                :key="item.idx"
                :data-idx="item.idx"
                class="item glass rounded-2xl"
                :class="{ 'is-open': open === item.idx }"
            >
                <button
                    type="button"
                    :aria-expanded="open === item.idx"
                    class="flex w-full items-center gap-4 p-6 text-left cursor-pointer"
                    @click="toggle(item.idx)"
                >
                    <span class="num flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums">{{ String(item.idx + 1).padStart(2, '0') }}</span>
                    <span class="flex-1 text-lg font-semibold text-white">{{ item.q }}</span>
                    <ChevronDown class="chev w-5 h-5 shrink-0 text-white/60" />
                </button>

                <!-- grid-rows 0fr -> 1fr animates the height without measuring it -->
                <div class="answer grid">
                    <div class="overflow-hidden">
                        <div class="px-6 pb-6 pl-18 text-gray-300">
                            <p>{{ item.a }}</p>
                            <div class="mt-4 flex items-center gap-3 text-xs text-white/40">
                                <template v-if="!votes[item.idx]">
                                    {{ t('faq.helpful') }}
                                    <button type="button" class="vote" aria-label="Yes" @click="votes[item.idx] = 'up'"><ThumbsUp class="w-4 h-4" /></button>
                                    <button type="button" class="vote" aria-label="No" @click="votes[item.idx] = 'down'"><ThumbsDown class="w-4 h-4" /></button>
                                </template>
                                <span v-else class="thanks text-emerald-300">{{ t('faq.thanks') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TransitionGroup>

        <div v-if="!list.length" class="flex h-full flex-col items-center justify-center gap-3 text-white/50">
            <SearchX class="w-8 h-8" />
            {{ t('faq.empty') }}
        </div>
        </div>
        </div>

        <!-- contact -->
        <div v-reveal="200" class="glass mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl p-8 text-center sm:flex-row sm:text-left">
            <div class="flex items-center gap-4">
                <span class="pulse flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-300/15 text-violet-300">
                    <MessageCircle class="w-6 h-6" />
                </span>
                <div>
                    <div class="font-semibold text-white">{{ t('faq.still.title') }}</div>
                    <div class="text-sm text-gray-300">{{ t('faq.still.text') }}</div>
                </div>
            </div>
            <button class="shrink-0 rounded-full bg-violet-300 px-6 py-3 font-bold text-[#31009a] transition-colors hover:bg-violet-200">
                {{ t('faq.still.btn') }}
            </button>
        </div>
    </section>
</template>

<style scoped>
/* Fixed-height list: fades appear on the side that has more content, thin scrollbar */
.scroll-box {
    mask-image: linear-gradient(to bottom, transparent 0, #000 var(--ft, 0px), #000 calc(100% - var(--fb, 0px)), transparent 100%);
    scrollbar-width: thin;
    scrollbar-color: rgb(196 181 253 / 0.3) transparent;
}
.scroll-box::-webkit-scrollbar {
    width: 6px;
}
.scroll-box::-webkit-scrollbar-thumb {
    border-radius: 9999px;
    background: rgb(196 181 253 / 0.3);
}

.search {
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.search:focus-within {
    border-color: rgb(196 181 253 / 0.5);
    box-shadow: 0 0 0 4px rgb(196 181 253 / 0.1);
}

.chip {
    color: rgb(255 255 255 / 0.6);
    border: 1px solid rgb(255 255 255 / 0.1);
    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}
.chip:hover {
    color: white;
    transform: translateY(-1px);
}
.chip.is-on {
    color: #171725;
    border-color: transparent;
    background: linear-gradient(to right, #c4b5fd, #7dd3fc);
}

.item {
    position: relative;
    transition: border-color 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease;
}
/* accent bar on the left edge grows when the item opens */
.item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 1.25rem;
    bottom: 1.25rem;
    width: 3px;
    border-radius: 9999px;
    background: linear-gradient(#c4b5fd, #7dd3fc);
    transform: scaleY(0);
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.item:hover {
    border-color: rgb(196 181 253 / 0.2);
}
.item.is-open {
    background-color: rgb(255 255 255 / 0.05);
    border-color: rgb(196 181 253 / 0.3);
    box-shadow: 0 10px 40px -10px rgb(124 58 237 / 0.3);
}
.item.is-open::before {
    transform: scaleY(1);
}

.num {
    color: rgb(255 255 255 / 0.5);
    background: rgb(255 255 255 / 0.06);
    transition: color 0.3s ease, background-color 0.3s ease;
}
.item.is-open .num {
    color: #171725;
    background: #c4b5fd;
}

.chev {
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease;
}
.item.is-open .chev {
    transform: rotate(180deg);
    color: #c4b5fd;
}

.answer {
    grid-template-rows: 0fr;
    opacity: 0;
    transition: grid-template-rows 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease;
}
.item.is-open .answer {
    grid-template-rows: 1fr;
    opacity: 1;
}

.vote {
    display: flex;
    padding: 0.4rem;
    border-radius: 9999px;
    transition: color 0.2s ease, background-color 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.vote:hover {
    color: white;
    background: rgb(255 255 255 / 0.1);
    transform: scale(1.15);
}
.thanks {
    animation: thanks-in 0.4s ease backwards;
}
@keyframes thanks-in {
    from { opacity: 0; transform: translateY(4px); }
}

.pulse {
    animation: pulse 2.6s ease-in-out infinite;
}
@keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgb(196 181 253 / 0.35); }
    50% { box-shadow: 0 0 0 10px rgb(196 181 253 / 0); }
}

/* filtering: items fade/slide in and out, the rest glide to their new place */
.list-enter-active,
.list-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.list-move {
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(12px);
}
.list-leave-active {
    position: absolute;
    left: 0;
    right: 0;
}

@media (prefers-reduced-motion: reduce) {
    .search, .chip, .item, .item::before, .num, .chev, .answer, .vote, .list-enter-active, .list-leave-active, .list-move { transition: none; }
    .pulse, .thanks { animation: none; }
}
</style>
