<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useUserStorage } from '~/composables/useUserStorage'
import { useUserStore } from '~/store/user'

import { VForm, VField } from '~/components'

const { push } = useRouter()
const { t } = useI18n()
const userStorage = useUserStorage()
const user = useUserStore()

const error = ref('')
const formLogin = reactive({
  email: '',
  password: ''
})

const LOGIN_MUTATION = gql`
  mutation Login ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      isAuth
      user {
        name
        email
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
    userStorage.value.isAuth = login.isAuth
    
    user.isAuth = login.isAuth
    user.data = login.user

    formLogin.email = ''
    formLogin.password = ''

    push({name: 'home'})
  }

  if(!login.isAuth) {
    error.value = login.error.path
  }
}

watch(formLogin, () => error.value = '')
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <VForm @submit.prevent="formLoginSubmit()" :error="error" name="login">
      <template #name>{{ t('login') }}</template>
      <template #fields>
        <VField v-model="formLogin.email" type="email" name="email" />
        <VField v-model="formLogin.password" type="password" name="password" />
      </template>
      <template #footer>Якщо у тебу ще немає облікового запису, перейди на сторінку реєстрації за цим <RouterLink :to="{name: 'register'}">посиланням</RouterLink>.</template>
    </VForm>
  </div>
</template>