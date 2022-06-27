<script setup lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

import { useUserStorage } from '~/composables/useUserStorage'
import { useUserStore } from '~/store/user'

import { AppHeader, AppMain, AppFooter } from '~/components'

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

const { result, onResult } = useQuery(AUTH_QUERY)

onResult(() => {
  userStorage.value.isAuth = result.value.auth.isAuth
  user.isAuth = result.value.auth.isAuth
  user.data = result.value.auth.user
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