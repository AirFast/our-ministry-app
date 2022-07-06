<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  start: { type: String, default: '0' },
  end: { type: String, default: '23' },
  modelValue: { type: String}
})

const items = computed<number[]>(() => {
  let arr = []

  for (let i = +props.start; i <= +props.end; i++) {
    arr.push(i)
  }

  return arr
})
</script>

<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    class="appearance-none font-medium outline-none pl-8 pr-7 py-3 mr-5 last-of-type:mr-0 rounded ring-1 ring-indigo-500/5 shadow bg-slate-50 dark:bg-slate-800"
  >
    <option v-for="item of items" :key="item" :value="item">{{ item < 10 ? `0${item}:00` : `${item}:00` }}</option>
  </select>
</template>