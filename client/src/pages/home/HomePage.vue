<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

watch(locale, (locale) => {
  document.documentElement.setAttribute('lang', locale)
})
</script>

<template>
  <form>
    <select v-model="locale">
      <option value="en">en</option>
      <option value="uk">uk</option>
    </select>
  </form>
  <h1 class="text-5xl">{{ t('hello') }}</h1>
  <p>Головна сторінка</p>
</template>