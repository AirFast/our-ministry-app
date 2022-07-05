<script setup lang="ts">
import { reactive, watch } from 'vue'
import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStorage } from '~/composables/useUserStorage'
import { useUserStore } from '~/store/user'
import { VForm, VField } from '~/components'
import { Maybe, Mutation, MutationLoginArgs, Error } from '~/generated/GraphqlTypes'

const { push } = useRouter()
const { t } = useI18n()
const userStorage = useUserStorage()
const user = useUserStore()

const error: Maybe<Error> = reactive({
  path: '',
  value: ''
})

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
const { mutate } = useMutation<Mutation, MutationLoginArgs>(LOGIN_MUTATION)

const formLoginSubmit = async () => {
  if(formLogin.email === '' || formLogin.password === '') {
    error.path = 'empty'
    return
  }

  if(formLogin.password.length < 8) {
    error.path = 'length'
    return
  }

  const res = await mutate(formLogin)
  
  if(res?.data?.login?.isAuth) {
    userStorage.value.isAuth = res.data.login.isAuth
    
    user.isAuth = res.data.login.isAuth
    user.data.name = res.data.login.user?.name
    user.data.email = res.data.login.user?.email
    user.data.role = res.data.login.user?.role

    formLogin.email = ''
    formLogin.password = ''

    push({name: 'home'})
  }

  if(!res?.data?.login?.isAuth) {
    error.path = res?.data?.login?.error?.path
    error.value = res?.data?.login?.error?.value
  }
}

watch(formLogin, () => {
  error.path = ''
  error.value = ''
})
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <VForm @submit.prevent="formLoginSubmit()" :error="error" name="login">
      <template #name>{{ t('login') }}</template>
      <template #fields>
        <VField v-model="formLogin.email" type="email" name="email" />
        <VField v-model="formLogin.password" type="password" name="password" />
      </template>
      <template #footer>
        {{ t('form.footer.login') }}
        <RouterLink :to="{name: 'register'}">{{ t('link') }}</RouterLink>.
      </template>
    </VForm>
  </div>
</template>