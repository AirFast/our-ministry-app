<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Maybe, Error } from '~/graphqlTypes'

const { t } = useI18n()

defineProps<{
  error: Maybe<Error>
}>()
</script>

<template>
  <form class="relative w-full max-w-md px-12 pt-8 pb-10 rounded-md ring-1 ring-indigo-500/5 shadow-md bg-slate-50 dark:bg-slate-800">
    <Transition name="error-fade">
      <p v-if="error?.path" class="absolute -top-20 left-0 w-full text-sm text-center text-rose-500 px-10 py-4 rounded-md border border-rose-200 duration-100 dark:border-rose-500">{{ t(`form.validation.${error.path}`).replace('#email', `${error.value}`) }}</p>
    </Transition>
    <h1 class="text-xl font-medium tracking-tight text-center mb-7">
      <slot name="name"></slot>
    </h1>
    <slot name="fields"></slot>
    <div class="flex justify-center mt-10">
      <button type="submit" class="font-medium uppercase text-sm tracking-wide w-full px-10 py-4 rounded bg-indigo-500 text-white duration-200 ease-out hover:bg-indigo-50 hover:text-indigo-500 dark:hover:bg-slate-700 dark:hover:text-white">
        <slot name="name"></slot>
      </button>
    </div>
    <p class="text-sm mt-8">
      <slot name="footer"></slot>
    </p>
  </form>
</template>