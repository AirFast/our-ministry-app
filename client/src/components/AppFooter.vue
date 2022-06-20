<script setup lang="ts">
import { watch } from 'vue'

import { useI18n } from 'vue-i18n'
import { useTheme, useUserStorage } from '~/composables'

import { TranslateIcon, MoonIcon, SunIcon } from '@heroicons/vue/solid'
import { OptionButton } from '~/components'

const { locale, t, availableLocales } = useI18n()
const userStorage = useUserStorage()
const { isDark, toggleDark } = useTheme()

const toggleLang = () => {
  locale.value = availableLocales[
    availableLocales.indexOf(locale.value) + 1 === availableLocales.length ? 0 : availableLocales.indexOf(locale.value) + 1
  ]
  userStorage.value.lang = locale.value
}

watch(
  locale,
  (locale) => {
    document.documentElement.setAttribute('lang', locale)
  },
  { immediate: true }
)
</script>

<template>
  <footer class="flex justify-between items-center py-6">
    <p class="text-xs">All rights reserved 2022 © Our Ministry</p>
    <div class="flex items-center">
      <p class="text-xs font-medium text-indigo-500 mr-4 dark:text-indigo-200">{{ t(locale) }}</p>
      <OptionButton @click="toggleLang()" class="mr-4">
        <TranslateIcon class="w-6 h-6 text-indigo-500 dark:text-indigo-200" />
      </OptionButton>
      <OptionButton @click="toggleDark()">
        <MoonIcon v-if="!isDark" class="w-6 h-6 text-indigo-500 dark:text-indigo-200" />
        <SunIcon v-else class="w-6 h-6 text-indigo-500 dark:text-indigo-200" />
      </OptionButton>
    </div>
  </footer>
</template>