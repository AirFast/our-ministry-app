<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUserStore } from '~/store/user'

import { HomeIcon } from '@heroicons/vue/solid'

const { t } = useI18n()
const user = useUserStore()
</script>

<template>
  <header class="flex items-center py-8">
    <HomeIcon class="w-8 h-8 mr-5 text-slate-700 dark:text-slate-500" />
    <h1 class="text-2xl">{{ t('hello') }} {{ user.data.name }}</h1>
  </header>
</template>