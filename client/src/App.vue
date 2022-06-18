<script setup lang="ts">
import { watch } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pages } from '~/pages'

const { locale, t } = useI18n()
const routs = pages.map(({path, name}) => ({ 
    path, name, isBtn: ['login', 'register'].includes(name as string) 
  })
)

watch(locale, (locale) => {
  document.documentElement.setAttribute('lang', locale)
})
</script>

<template>
  <header class="py-6">
    <nav class="flex items-center justify-between">
      <form>
        <select v-model="locale">
          <option value="en">en</option>
          <option value="uk">uk</option>
        </select>
      </form>
      <ul class="-mx-4 text-right" :class="{'-mr-2': routs[routs.length - 1].isBtn}">
        <li v-for="{path, name, isBtn} in routs" class="inline-block">
          <RouterLink :to="path" class="text-sm font-medium block px-4 transition-colors duration-200 ease-out" :class="[{'link-button': isBtn}, {'hover:text-indigo-500': !isBtn}]">{{ t(name as string) }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <slot>
      <RouterView />
    </slot>
  </main>
  <footer class="text-center py-6">
    <p class="text-xs">All rights reserved 2022 © Our Ministry</p>
  </footer>
</template>

<style>
@import './styles/index.css';
</style>