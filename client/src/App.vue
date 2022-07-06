<script setup lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { useUserStorage } from '~/composables/useUserStorage'
import { useUserStore } from '~/store/user'
import { AppHeader, AppMain, AppFooter } from '~/components'
import { Query } from '~/generated/GraphqlTypes'

const userStorage = useUserStorage()
const user = useUserStore()

const AUTH_QUERY = gql`
  query Auth {
    auth {
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

const { result, onResult } = useQuery<Query>(AUTH_QUERY)

onResult(() => {
  if (result.value?.auth?.isAuth) {
    userStorage.value.isAuth = result.value.auth.isAuth
    user.isAuth = result.value.auth.isAuth
    user.data.name = result.value.auth.user?.name
    user.data.email = result.value.auth.user?.email
    user.data.role = result.value.auth.user?.role
  }
})
</script>

<template>
  <AppHeader />
  <AppMain />
  <AppFooter />
</template>

<style>
@import './styles/index.css';
</style>