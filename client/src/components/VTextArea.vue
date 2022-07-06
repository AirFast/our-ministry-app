<script setup lang="ts">
import { AnnotationIcon, BookmarkIcon, TrashIcon } from '@heroicons/vue/solid'
import { VButton } from '~/components'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
}>()

const addTitle = () => {
  emit('update:modelValue', `${props.modelValue}<title></title>` )
}

const addParagraph = () => {
  emit('update:modelValue', `${props.modelValue}<paragraph></paragraph>` )
}

const addClear = () => {
  emit('update:modelValue', '' )
}
</script>

<template>
  <div class="flex">
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="appearance-none outline-none px-4 py-3 resize-none max-w-2xl w-full h-44 rounded ring-1 ring-indigo-500/5 shadow bg-slate-50 dark:bg-slate-800"
    />
    <div class="flex flex-col ml-3">
      <VButton @click="addTitle" class="mb-3">
        <BookmarkIcon class="w-5 h-5 text-indigo-500 dark:text-indigo-200" />
      </VButton>
      <VButton @click="addParagraph" class="mb-3">
        <AnnotationIcon class="w-5 h-5 text-indigo-500 dark:text-indigo-200" />
      </VButton>
      <VButton @click="addClear">
        <TrashIcon class="w-5 h-5 text-indigo-500 dark:text-indigo-200" />
      </VButton>
    </div>
  </div>
</template>