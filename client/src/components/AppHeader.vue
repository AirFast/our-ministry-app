<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { pages } from '~/pages'

const { t } = useI18n()

const routs = pages.map(({ path, name }) => ({ 
    path, name, isBtn: ['login', 'register'].includes(name as string) 
  })
)
</script>

<template>
  <header class="py-6">
    <nav>
      <ul class="-mx-4 text-right" :class="{'-mr-2': routs[routs.length - 1].isBtn}">
        <li v-for="{path, name, isBtn} in routs" class="inline-block">
          <RouterLink :to="path" class="text-sm font-medium block px-4 py-1 transition-all duration-200 ease-out" :class="[{'link-button': isBtn}, {'hover:text-indigo-500 dark:hover:text-indigo-200': !isBtn}]">{{ t(name as string) }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>