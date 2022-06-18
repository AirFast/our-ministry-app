<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'

import { pages } from '~/pages'

const routs = pages.map(({path, name}) => ({ path, name, isBtn: ['login', 'register'].includes(name as string) }))

console.log(routs);

</script>

<template>
  <header class="py-6 divide-y divide-slate-100">
    <nav>
      <ul class="-mx-4 text-right" :class="{'-mr-2': routs[routs.length - 1].isBtn}">
        <li v-for="{path, name, isBtn} in routs" class="inline-block">
          <RouterLink :to="path" class="text-sm font-medium block first-letter:uppercase px-4 transition-colors duration-200 ease-out" :class="[{'link-button': isBtn}, {'hover:text-indigo-500': !isBtn}]">{{ name }}</RouterLink>
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
@import './index.css';
</style>