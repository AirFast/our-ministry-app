<script setup lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { useI18n } from 'vue-i18n'
import { CogIcon } from '@heroicons/vue/solid'
import { reactive, watch } from 'vue'
import { VTimeSelect, VTextArea } from '~/components'
import { Query } from '~/generated/GraphqlTypes'

const { t } = useI18n()
const settings = reactive({
  standStart: '',
  standEnd: '',
  text: ''
})

const SETTINGS_QUERY = gql`
  query Settings {
    settings {
      id
      name
      value
    }
  } 
`

const { result, loading } = useQuery<Query>(SETTINGS_QUERY)

watch(
  () => result.value,
  (result) => {
    result?.settings?.map(setting => {
      settings[setting?.name as keyof typeof settings] = setting?.value ?? ''
    })
  },
  { immediate: true }
)
</script>

<template>
  <header class="flex items-center py-8">
    <CogIcon class="w-8 h-8 mr-5 text-slate-700 dark:text-slate-500" />
    <h1 class="text-2xl">{{ t('user.menu.setting') }}</h1>
  </header>
  <div v-if="!loading">
    <section class="flex items-center py-8">
      <h2 class="mr-8">Служіння зі стендом</h2>
      <VTimeSelect v-model="settings.standStart" :end="settings.standEnd" />
      <VTimeSelect v-model="settings.standEnd" :start="settings.standStart" />
    </section>
    <section class="py-8">
      <h2 class="mb-8">Повідомлення</h2>
      <VTextArea v-model="settings.text" />
    </section>
  </div>
  
</template>