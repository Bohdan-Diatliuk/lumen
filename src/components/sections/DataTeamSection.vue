<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
    <section>
        <div>

            <div>
                <h1>{{ t('dataTeam.title') }}</h1>
                <p>{{ t('dataTeam.mainText') }}</p>
                <p></p>
            </div>
        </div>
    </section>
</template>