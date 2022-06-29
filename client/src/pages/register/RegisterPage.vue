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

const error = reactive({
  path: '',
  value: ''
})

const formRegister = reactive({
  name: '',
  email: '',
  password: ''
})

const REGISTER_MUTATION = gql`
  mutation Register ($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
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
        value
        message
      }
    }
  } 
`
const { mutate } = useMutation(REGISTER_MUTATION)

const formRegisterSubmit = async () => {
  if(formRegister.name === '' || formRegister.email === '' || formRegister.password === '') {
    error.path = 'empty'
    return
  }

  if(formRegister.password.length < 8) {
    error.path = 'length'
    return
  }

  const { data: { register } } = await mutate(formRegister)  
  
  if(register.isAuth) {
    userStorage.value.isAuth = register.isAuth
    
    user.isAuth = register.isAuth
    user.data = register.user

    formRegister.email = ''
    formRegister.password = ''

    push({name: 'home'})
  }

  if(!register.isAuth) {
    error.path = register.error.path
    error.value = register.error.value
  }
}

watch(formRegister, () => {
  error.path = ''
  error.value = ''
})
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
      <template #footer>
        {{ t('form.footer.register') }}
        <RouterLink :to="{name: 'login'}">{{ t('link') }}</RouterLink>.
      </template>
    </VForm>
  </div>
</template>