import { createApp } from 'vue'
import App from '~/App.vue'

import { createPinia } from 'pinia'
import { router } from '~/router'
import { i18n } from './i18n'

import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

import { useUserStore } from '~/store/user'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

const user = useUserStore()

const allCookies = document.cookie
console.log(allCookies);


const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  // headers: {
  //   authorization: user.token ? `Bearer ${user.token}` : ''
  // }
})

app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')