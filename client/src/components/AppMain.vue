<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="flex-grow flex-shrink-0 basis-[700px]">
    <slot>
      <RouterView />
    </slot>
  </main>
</template>