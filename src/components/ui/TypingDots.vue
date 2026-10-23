<template>
    <span class="inline-flex items-center gap-1" aria-hidden="true">
        <span v-for="i in 3" :key="i" class="dot" :style="{ '--i': i }"></span>
    </span>
</template>

<style scoped>
.dot {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 9999px;
    background: currentColor;
    animation: dot-bounce 1s ease-in-out infinite;
    animation-delay: calc(var(--i) * 140ms);
}

@keyframes dot-bounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-0.25rem); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
    .dot { animation: none; }
}
</style>
