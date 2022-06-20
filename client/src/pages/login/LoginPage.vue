<script setup lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const LOGIN_QUERY = gql`
  query login ($email: String!) {
    login(email: $email) {
      name
    }
  } 
`

const { t } = useI18n()
const formLogin = reactive({
  email: 'airfast.88@gmail.com',
  password: ''
})

const { result, error } = useQuery(LOGIN_QUERY, formLogin)

console.log(result);

const formLoginSubmit = () => {

  const { result, error } = useQuery(LOGIN_QUERY, formLogin)
  console.log(result);
  // console.log(formLogin);
  
}
</script>

<template>
  <div class="flex justify-center py-52">
    <form @submit.prevent="formLoginSubmit()" name="login" class="w-full max-w-md px-12 pt-8 pb-10 rounded-md ring-1 ring-indigo-500/5 shadow-md bg-slate-50 dark:bg-slate-800">
      <h1 class="text-xl font-medium tracking-tight text-center mb-7">{{ t('login') }}</h1>
      <div class="mb-6 last-of-type:mb-0">
        <input v-model="formLogin.email" class="w-full border rounded px-4 py-3 outline-none duration-200 focus:border-indigo-300 dark:text-slate-500" type="email" placeholder="Email" />
      </div>
      <div class="mb-6 last-of-type:mb-0">
        <input v-model="formLogin.password" class="w-full border rounded px-4 py-3 outline-none duration-200 focus:border-indigo-300 dark:text-slate-500" type="password" placeholder="Password" />
      </div>
      <div class="flex justify-center mt-10">
        <button type="submit" class="font-medium uppercase text-sm tracking-wide w-full px-10 py-4 rounded bg-indigo-500 text-white duration-200 ease-out hover:bg-indigo-50 hover:text-indigo-500 dark:hover:bg-slate-700 dark:hover:text-white">{{ t('login') }}</button>
      </div>
      <p class="text-sm mt-8">Якщо у вас ще немає облікового запису, перейдіть на сторінку реєстрації за цим <RouterLink to="/register">посиланням</RouterLink>.</p>
    </form>  
  </div>
</template>