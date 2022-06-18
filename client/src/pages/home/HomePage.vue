<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n({ inheritLocale: true, useScope: 'global' })
</script>

<template>
  <form>
    <label>{{ t('language') }}</label>
    <select v-model="locale">
      <option value="en">en</option>
      <option value="uk">uk</option>
    </select>
  </form>
  <h1 class="text-5xl">{{ t('hello') }}</h1>
  <p>Головна сторінка</p>
</template>