<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { CogIcon } from '@heroicons/vue/solid'

const { t } = useI18n()
</script>

<template>
  <header class="flex items-center py-8">
    <CogIcon class="w-10 h-10 mr-5 text-slate-700 dark:text-slate-500" />
    <h1 class="text-3xl">{{ t('user.menu.setting') }}</h1>
  </header>
</template>