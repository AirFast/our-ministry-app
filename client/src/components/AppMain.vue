<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="h-[calc(100vh-210px)] min-h-[500px]">
    <slot>
      <RouterView />
    </slot>
  </main>
</template>