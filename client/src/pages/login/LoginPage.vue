<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useUserStore } from '~/store/user'
import { useUserStorage } from '~/composables/useUserStorage'

import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'

const user = useUserStore()
const userStorage = useUserStorage()

const isPassVisible = ref(false)
const error = ref('')
const formLogin = reactive({
  email: 'airfast.88@gmail.com',
  password: '12345678'
})

const { push } = useRouter()
const { t } = useI18n()

const LOGIN_MUTATION = gql`
  mutation Login ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      isAuth
      token
      hash
      user {
        id
        role {
          name
        }
      }
      error {
        path
        message
      }
    }
  } 
`
const { mutate } = useMutation(LOGIN_MUTATION)

const formLoginSubmit = async () => {
  if(formLogin.email === '' || formLogin.password === '') {
    error.value = 'empty'
    return
  }

  if(formLogin.password.length < 8) {
    error.value = 'length'
    return
  }

  const { data: { login } } = await mutate(formLogin)
  
  if(login.isAuth) {
    // user.token = login.token
    userStorage.value.id = login.user.id
    userStorage.value.hash = login.hash

    // formLogin.email = ''
    // formLogin.password = ''

    // push({name: 'home'})
  }

  if(!login.isAuth) {
    error.value = login.error.path
  }
}

watch(formLogin, () => error.value = '')
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <form @submit.prevent="formLoginSubmit()" name="login" class="relative w-full max-w-md px-12 pt-8 pb-10 rounded-md ring-1 ring-indigo-500/5 shadow-md bg-slate-50 dark:bg-slate-800">
      <Transition name="error-fade">
        <p v-if="error" class="absolute -top-20 left-0 w-full text-sm text-center text-rose-500 px-10 py-4 rounded-md border border-rose-200 duration-100 dark:border-rose-500">{{ t(`validation.${error}`) }}</p>
      </Transition>
      <h1 class="text-xl font-medium tracking-tight text-center mb-7">{{ t('login') }}</h1>
      <div class="mb-7 last-of-type:mb-0">
        <input v-model="formLogin.email" class="w-full border rounded px-4 py-3 outline-none duration-200 focus:border-indigo-300 dark:text-slate-500" type="email" :placeholder="t('form.email')" />
      </div>
      <div class="mb-7 relative last-of-type:mb-0">
        <input v-model="formLogin.password" :type="!isPassVisible ? 'password' : 'text'" :placeholder="t('form.password')" class="w-full border rounded px-4 py-3 outline-none duration-200 focus:border-indigo-300 dark:text-slate-500" :class="{'pr-14': true}" />
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