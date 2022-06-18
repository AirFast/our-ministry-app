<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <h1 class="text-5xl">{{ t('hello') }}</h1>
  <p>Головна сторінка</p>
</template>