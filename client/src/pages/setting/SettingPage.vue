<script setup lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { useI18n } from 'vue-i18n'
import { CogIcon } from '@heroicons/vue/solid'
import { reactive } from 'vue'
import { Query } from '~/graphqlTypes'

const { t } = useI18n()
const settings = reactive({
  standStart: '',
  standEnd: ''
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

const { result, loading, onResult } = useQuery<Query>(SETTINGS_QUERY)

onResult(() => {
    if(result.value) {
      result.value.settings?.map(setting => {
        settings[setting?.name as keyof typeof settings] = setting?.value ?? ''
      })
    }
  }
)
</script>

<template>
  <header class="flex items-center py-8">
    <CogIcon class="w-8 h-8 mr-5 text-slate-700 dark:text-slate-500" />
    <h1 class="text-2xl">{{ t('user.menu.setting') }}</h1>
  </header>
  <section v-if="!loading" class="flex items-center py-8">
    <p class="mr-8">Служіння зі стендом</p>
    <select v-for="(setting, i) in result?.settings" :key="i" v-model="settings[setting?.name as keyof typeof settings]" class="appearance-none font-medium outline-none pl-8 pr-7 py-3 mr-5 last-of-type:mr-0 rounded ring-1 ring-indigo-500/5 shadow bg-slate-50 dark:bg-slate-800">
      <option v-for="item of 23" :key="item" :value="item">{{ item < 10 ? `0${item}:00` : `${item}:00` }}</option>
    </select>
  </section>
</template>