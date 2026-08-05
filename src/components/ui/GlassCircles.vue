<script setup lang="ts">
import { LiquidGlass } from '@zaosoula/liquid-glass-vue/components';

const circles = [
    { size: 120, left: '12%', top: '30%', duration: '18s', delay: '0s' },
    { size: 80, left: '38%', top: '55%', duration: '24s', delay: '-6s' },
    { size: 260, left: '70%', top: '5%', duration: '21s', delay: '-3s' },
    { size: 164, left: '82%', top: '62%', duration: '16s', delay: '-9s' },
    { size: 180, left: '52%', top: '78%', duration: '27s', delay: '-12s' },
    { size: 100, left: '98%', top: '0%', duration: '20s', delay: '-12s' },
    { size: 80, left: '58%', top: '-10%', duration: '23s', delay: '-12s' },
    { size: 80, left: '28%', top: '-6%', duration: '33s', delay: '-2s' },
    { size: 200, left: '12%', top: '48%', duration: '37s', delay: '-12s' },
];
</script>

<template>
    <div class="absolute inset-0 pointer-events-none">
        <div v-for="(c, i) in circles" :key="i" class="floater absolute" :style="{
            left: c.left,
            top: c.top,
            width: `${c.size}px`,
            height: `${c.size}px`,
            animationDuration: c.duration,
            animationDelay: c.delay,
        }">
            <LiquidGlass :corner-radius="999" :displacement-scale="30" :blur-amount="0.0208" :saturation="120"
                :aberration-intensity="1" :elasticity="0.13" padding="0">
                <div :style="{ width: `${c.size}px`, height: `${c.size}px` }" />
            </LiquidGlass>
        </div>
    </div>
</template>

<style scoped>
.floater {
    animation-name: drift;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

.floater :deep(span:not(.glass__warp)) {
    display: none;
}

@keyframes drift {
    0% {
        margin-left: 0;
        margin-top: 0;
    }

    33% {
        margin-left: 60px;
        margin-top: -40px;
    }

    66% {
        margin-left: -30px;
        margin-top: 50px;
    }

    100% {
        margin-left: 40px;
        margin-top: 20px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .floater {
        animation: none;
    }
}
</style>
