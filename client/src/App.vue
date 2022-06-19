<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { TranslateIcon, MoonIcon, SunIcon } from '@heroicons/vue/solid'
import { useI18n } from 'vue-i18n'
import { pages } from '~/pages'
import { useTheme } from '~/composables'

const { locale, t, availableLocales } = useI18n()

const routs = pages.map(({ path, name }) => ({ 
    path, name, isBtn: ['login', 'register'].includes(name as string) 
  })
)

const toggleLang = () => {
  locale.value = availableLocales[
    availableLocales.indexOf(locale.value)  + 1 === availableLocales.length ? 0 : availableLocales.indexOf(locale.value) + 1
  ]
}

const { isDark, toggleDark } = useTheme()

watch(
  locale,
  (locale) => {
    document.documentElement.setAttribute('lang', locale)
  },
  { immediate: true }
)
</script>

<template>
  <header class="py-6">
    <nav>
      <ul class="-mx-4 text-right" :class="{'-mr-2': routs[routs.length - 1].isBtn}">
        <li v-for="{path, name, isBtn} in routs" class="inline-block">
          <RouterLink :to="path" class="text-sm font-medium block px-4 transition-colors duration-200 ease-out dark:text-white" :class="[{'link-button': isBtn}, {'hover:text-indigo-500': !isBtn}]">{{ t(name as string) }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <slot>
      <RouterView />
    </slot>
  </main>
  <footer class="flex justify-between items-center py-6">
    <p class="text-xs">All rights reserved 2022 © Our Ministry</p>
    <div class="flex items-center">
      <p class="text-xs font-medium text-indigo-500 mr-4">{{ t(locale) }}</p>
      <button @click="toggleLang()" type="button" class="w-12 h-12 mr-4 rounded-full ring-1 ring-indigo-500/5 shadow-md flex items-center justify-center">
        <TranslateIcon class="w-6 h-6 text-indigo-500"/>
      </button>
      <button @click="toggleDark()"  type="button" class="w-12 h-12 rounded-full ring-1 ring-indigo-500/5 shadow-md flex items-center justify-center">
        <MoonIcon v-if="!isDark" class="w-6 h-6 text-indigo-500"/>
        <SunIcon v-else class="w-6 h-6 text-indigo-500"/>
      </button>
    </div>
  </footer>
</template>

<style>
@import './styles/index.css';
</style>