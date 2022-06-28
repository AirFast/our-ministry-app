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
const formRegister = reactive({
  name: '',
  email: '',
  password: ''
})

// const LOGIN_MUTATION = gql`
//   mutation Login ($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       isAuth
//       user {
//         name
//         email
//         role {
//           name
//         }
//       }
//       error {
//         path
//         message
//       }
//     }
//   } 
// `
// const { mutate } = useMutation(LOGIN_MUTATION)

const formRegisterSubmit = async () => {
  if(formRegister.name === '' || formRegister.email === '' || formRegister.password === '') {
    error.value = 'empty'
    return
  }

  if(formRegister.password.length < 8) {
    error.value = 'length'
    return
  }

  // const { data: { login } } = await mutate(formLogin)
  
  // if(login.isAuth) {
  //   userStorage.value.isAuth = login.isAuth
    
  //   user.isAuth = login.isAuth
  //   user.data = login.user

  //   formLogin.email = ''
  //   formLogin.password = ''

  //   push({name: 'home'})
  // }

  // if(!login.isAuth) {
  //   error.value = login.error.path
  // }
}

watch(formRegister, () => error.value = '')
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <VForm @submit.prevent="formRegisterSubmit()" :error="error" name="register">
      <template #name>{{ t('register') }}</template>
      <template #fields>
        <VField v-model="formRegister.name" type="text" name="name" />
        <VField v-model="formRegister.email" type="email" name="email" />
        <VField v-model="formRegister.password" type="password" name="password" />
      </template>
      <template #footer>Якщо у тебе вже є облікововий запис, перейди на сторінку входу за цим <RouterLink :to="{name: 'login'}">посиланням</RouterLink>.</template>
    </VForm>
  </div>
</template>