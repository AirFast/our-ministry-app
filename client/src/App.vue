<script setup lang="ts">
import { AppHeader, AppMain, AppFooter } from '~/components'

import gql from 'graphql-tag'
import { useQuery, useLazyQuery } from '@vue/apollo-composable'

import { useUserStore } from '~/store/user'
import { useUserStorage } from '~/composables/useUserStorage'

const user = useUserStore()
const userStorage = useUserStorage()

const REFRESH_QUERY = gql`
  query Refresh ($id: ID!) {
    refresh(id: $id) {
      isAuth
      token
      error {
        path
        message
      }
    }
  }
`

const AUTH_QUERY = gql`
  query Auth ($hash: ID!) {
    auth(hash: $hash) {
      isAuth
      token
      error {
        path
        message
      }
    }
  }
`

if (userStorage.value.id && userStorage.value.hash) {
  const { result: refresh, onResult: onResultRefresh } = useQuery(REFRESH_QUERY, { id: userStorage.value.id })

  onResultRefresh(() => {
    console.log(refresh.value);
    
    user.token = refresh.value.refresh.token
  })

  const { result: auth, onResult: onResultAuth } = useQuery(AUTH_QUERY, { hash: userStorage.value.hash })

  onResultAuth(() => {
    console.log(auth.value, user.token);
    
    user.token = auth.value.auth.token
  })
}

</script>

<template>
  <AppHeader />
  <AppMain />
  <AppFooter />
</template>

<style>
@import './styles/index.css';
</style>