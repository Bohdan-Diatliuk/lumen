<script setup lang="ts">
defineProps<{ emoji: string; count: number }>()
</script>

<template>
    <span class="pill inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-gray-300">
        <span>{{ emoji }}</span>{{ count }}
    </span>
</template>

<style scoped>
.pill {
    animation: pill-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    animation-delay: calc(var(--i, 0) * 150ms);
}

@keyframes pill-pop {
    from { opacity: 0; transform: scale(0.4); }
}

@media (prefers-reduced-motion: reduce) {
    .pill { animation: none; }
}
</style>
