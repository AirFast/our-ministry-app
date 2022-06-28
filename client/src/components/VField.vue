<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'

  defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
  }>()

  defineProps<{
    type: string
    name: string
    modelValue: string
  }>()

  const { t } = useI18n()
  const isPassVisible = ref(false)
</script>

<template>
  <div class="mb-7 relative">
    <input
      :value="modelValue"
      :type="!isPassVisible ? type : 'text'"
      :placeholder="t(`form.field.${name}`)"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="w-full border rounded px-4 py-3 outline-none duration-200 focus:border-indigo-300 dark:text-slate-500" :class="{'pr-14': type === 'password'}"
    />
    <span v-if="type === 'password'" @click="isPassVisible = !isPassVisible" class="absolute top-0 right-0 h-full cursor-pointer flex items-center px-4 duration-200 text-slate-400 hover:text-slate-300">
      <EyeIcon v-if="!isPassVisible" class="w-6 h-6" />
      <EyeOffIcon v-else class="w-6 h-6" />
    </span>
  </div>
</template>