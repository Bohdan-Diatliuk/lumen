<template>
    <span class="logo group inline-flex items-center gap-2.5">
        <span class="mark relative flex h-8 w-8 items-center justify-center rounded-[10px] bg-linear-to-br from-violet-300 via-violet-300 to-sky-300">
            <!-- four-point spark: the "lumen" (light) -->
            <svg viewBox="0 0 24 24" class="spark h-5 w-5" aria-hidden="true">
                <path fill="#171725" d="M12 2c.6 5.2 2.8 7.4 10 10-7.2 2.6-9.4 4.8-10 10-.6-5.2-2.8-7.4-10-10 7.2-2.6 9.4-4.8 10-10Z" />
            </svg>
            <span class="dot absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-white"></span>
        </span>
        <span class="word text-xl font-bold tracking-tight">Lumen</span>
    </span>
</template>

<style scoped>
.mark {
    box-shadow: 0 0 18px rgb(167 139 250 / 0.45);
    transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.spark {
    transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.logo:hover .mark {
    box-shadow: 0 0 26px rgb(125 211 252 / 0.6);
    transform: scale(1.06);
}
.logo:hover .spark {
    transform: rotate(90deg) scale(0.95);
}

.dot {
    animation: twinkle 3s ease-in-out infinite;
}
@keyframes twinkle {
    0%, 100% { opacity: 0.9; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(0.6); }
}

.word {
    background: linear-gradient(100deg, #fff 40%, #c4b5fd 70%, #7dd3fc);
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    transition: background-position 0.6s ease;
}
.logo:hover .word {
    background-position: 100% 0;
}

@media (prefers-reduced-motion: reduce) {
    .dot { animation: none; }
    .mark, .spark, .word { transition: none; }
}
</style>
