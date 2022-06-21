<script setup lang="ts">
import { reactive, ref } from 'vue'

import gql from 'graphql-tag'
import { useLazyQuery } from '@vue/apollo-composable'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'

const formLogin = reactive({
  email: '',
  password: ''
})

const LOGIN_QUERY = gql`
  query Login ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      email
      password
    }
  } 
`
const { result, load, onResult, loading } = useLazyQuery(LOGIN_QUERY, () => formLogin, { fetchPolicy: 'cache-first' })

const { t } = useI18n()


const formLoginSubmit = () => {
  load()
  onResult(() => {
    console.log(result.value);
  })
  console.log(loading);
}

const isPassVisible = ref(false)
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <form @submit.prevent="formLoginSubmit()" name="login" class="w-full max-w-md px-12 pt-8 pb-10 rounded-md ring-1 ring-indigo-500/5 shadow-md bg-slate-50 dark:bg-slate-800">
      <h1 class="text-xl font-medium tracking-tight text-center mb-7">{{ t('login') }} {{ result }}</h1>
      <div class="mb-7 last-of-type:mb-0">
        <input v-model="formLogin.email" class="w-full border rounded px-4 py-3 outline-none duration-200 focus:border-indigo-300 dark:text-slate-500" type="email" placeholder="email" />
      </div>
      <div class="mb-7 relative last-of-type:mb-0">
        <input v-model="formLogin.password" :type="!isPassVisible ? 'password' : 'text'" placeholder="password" class="w-full border rounded px-4 py-3 outline-none duration-200 focus:border-indigo-300 dark:text-slate-500" :class="{'pr-14': true}" />
        <span @click="isPassVisible = !isPassVisible" class="absolute top-0 right-0 h-full cursor-pointer flex items-center px-4 duration-200 text-slate-400 hover:text-slate-300">
          <EyeIcon v-if="!isPassVisible" class="w-6 h-6" />
          <EyeOffIcon v-else class="w-6 h-6" />
        </span>
      </div>
      <div class="flex justify-center mt-10">
        <button type="submit" class="font-medium uppercase text-sm tracking-wide w-full px-10 py-4 rounded bg-indigo-500 text-white duration-200 ease-out hover:bg-indigo-50 hover:text-indigo-500 dark:hover:bg-slate-700 dark:hover:text-white">{{ t('login') }}</button>
      </div>
      <p class="text-sm mt-8">Якщо у вас ще немає облікового запису, перейдіть на сторінку реєстрації за цим <RouterLink to="/register">посиланням</RouterLink>.</p>
    </form>  
  </div>
</template>