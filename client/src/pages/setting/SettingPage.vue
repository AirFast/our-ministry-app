<script setup lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { useI18n } from 'vue-i18n'
import { CogIcon } from '@heroicons/vue/solid'
import { reactive, watch } from 'vue'
import { VTimeSelect } from '~/components'
import { Query } from '~/generated/GraphqlTypes'

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
  <section v-if="!loading" class="flex items-center py-8">
    <p class="mr-8">Служіння зі стендом</p>
    <VTimeSelect v-model="settings.standStart" :end="settings.standEnd" @update:model-value="$emit('update:modelValue', $event)" />
    <VTimeSelect v-model="settings.standEnd" :start="settings.standStart" @update:model-value="$emit('update:modelValue', $event)" />
  </section>
</template>