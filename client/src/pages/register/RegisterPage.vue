<script setup lang="ts">
import { reactive, watch } from 'vue'
import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStorage } from '~/composables/useUserStorage'
import { useUserStore } from '~/store/user'
import { VForm, VField } from '~/components'
import { Maybe, Mutation, Error, MutationRegisterArgs } from '~/graphqlTypes'

const { push } = useRouter()
const { t } = useI18n()
const userStorage = useUserStorage()
const user = useUserStore()

const error: Maybe<Error> = reactive({
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
const { mutate } = useMutation<Mutation, MutationRegisterArgs>(REGISTER_MUTATION)

const formRegisterSubmit = async () => {
  if(formRegister.name === '' || formRegister.email === '' || formRegister.password === '') {
    error.path = 'empty'
    return
  }

  if(formRegister.password.length < 8) {
    error.path = 'length'
    return
  }

  const res = await mutate(formRegister)  
  
  if(res?.data?.register?.isAuth) {
    userStorage.value.isAuth = res.data.register.isAuth
    
    user.isAuth = res.data.register.isAuth
    user.data.name = res.data.register.user?.name
    user.data.email = res.data.register.user?.email
    user.data.role = res.data.register.user?.role

    formRegister.email = ''
    formRegister.password = ''

    push({name: 'home'})
  }

  if(!res?.data?.register?.isAuth) {
    error.path = res?.data?.register?.error?.path
    error.value = res?.data?.register?.error?.value
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