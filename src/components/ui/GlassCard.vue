<script setup lang="ts">
import { LiquidGlass } from '@zaosoula/liquid-glass-vue/components';

</script>

<template>
    <div class="w-15 h-15 rounded-2xl border border-white/7 bg-white/2 bg-clip-padding backdrop-blur-[6px] shadow-[2px_8px_32px_0_rgba(0,0,0,0.3)]">
        <LiquidGlass :corner-radius="16" :displacement-scale="100" :blur-amount="0.0208" :saturation="100"
            :aberration-intensity="1" :elasticity="0.13" padding="0">
        </LiquidGlass>
    </div>
</template>