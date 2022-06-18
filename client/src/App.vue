<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'

import { pages } from '~/pages'
</script>

<template>
  <nav>
    <RouterLink v-for="{path, name} in pages" :to="path" class="block first-letter:uppercase">{{ name }}</RouterLink>
  </nav>
  <main class="container px-2 mx-auto">
    <slot>
      <RouterView />
    </slot>
  </main>
</template>

<style>
@import './index.css';
</style>