<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { Query } from '~/generated/GraphqlTypes'
import { useUserStore } from '~/store/user'
import { ExclamationCircleIcon, XIcon } from '@heroicons/vue/outline'

const user = useUserStore()

const SETTING_QUERY = gql`
  query Setting {
    setting(name: "message") {
      name
      value
    }
  }
`

const { result } = useQuery<Query>(SETTING_QUERY)
const isShow = computed({
  get() {
    return user.isAuth && result.value !== undefined && result.value?.setting?.value !== ''
  },
  set(value) {
    if (!value) result.value = undefined
  }
})
</script>

<template>
  <main class="flex-grow flex-shrink-0 basis-[700px]">
    <div
      v-if="isShow"
      class="message relative max-w-xl mb-8 text-sm text-center text-indigo-500 px-10 py-5 rounded-md border-2 border-indigo-200 duration-100 dark:text-indigo-200 dark:border-indigo-500"
    >
      <ExclamationCircleIcon class="text-indigo-500 absolute top-2 left-2 w-6 h-6" />
      <span v-html="result?.setting?.value?.replace(/title/g, 'h1').replace(/paragraph/g, 'p')" />
      <button @click="isShow = false" class="absolute top-2 right-2"><XIcon class="text-indigo-500 w-4 h-4" /></button>
    </div>
    <slot>
      <RouterView />
    </slot>
  </main>
</template>